import { Injectable } from '@nestjs/common';
import { SanityClient, createClient } from '@sanity/client';
import { PageInfo, PageLayout, TranslatedPage } from './types/Pages';
import {
  createImageUrlBuilder,
  SanityImageObject,
} from '@sanity/image-url';
import { Image } from './types/Image';
import { ArticlePage } from './types/Article';

@Injectable()
export class SanityService {
  private readonly client: SanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    useCdn: true,
    token: process.env.SANITY_TOKEN,
  });

  public getImage(name: string, imgSrc: SanityImageObject): Image {
    const imageUrlBuilder = createImageUrlBuilder(this.client);
    const imgBuilder = imageUrlBuilder.image(imgSrc);
    const img = new Image();
    img.name = name;
    img.src = imgBuilder.url();
    img.sourceItems = [];
    img.sourceItems.push(
      {
        media: `(min-width:1280px)`,
        srcSet: `${imgBuilder.width(1280).url()}`,
      },
      {
        media: `(min-width:1024px)`,
        srcSet: `${imgBuilder.width(1024).url()}`,
      },
      {
        media: `(min-width:768px)`,
        srcSet: `${imgBuilder.width(768).url()}`,
      },
      {
        media: `(min-width:512px)`,
        srcSet: `${imgBuilder.width(512).url()}`,
      },
    );

    return img;
  }

  public async getContentReference(
    language: 'de' | 'en',
    docRef: string,
  ): Promise<string> {
    return this.performCmsQuery<string>(
      undefined,
      docRef,
      undefined,
      undefined,
      language,
    );
  }

  public async getPages(language: 'de' | 'en'): Promise<PageInfo[]> {
    return this.performCmsQuery<PageInfo[]>(
      'page',
      undefined,
      `_id,relativeUrl,language`,
      undefined,
      language,
    );
  }

  public async getPageLayout(language: 'de' | 'en'): Promise<PageLayout[]> {
    return this.performCmsQuery<PageLayout[]>(
      'pagelayout',
      undefined,
      `
    ...,
    footerref{
      ...,
      content{
        ...,
        rows[]{
          ...,
          cells[]{
            ...,
            list{
              ...,
              listitems[]{
                ...,
                pageRef->{relativeUrl}
              }
            }
          }
        }
      }
    },
    navigationmenu{
      ...,
      listitems[]{
        ...,
        pageRef->{relativeUrl}
      }
    }`,
      ` && theme == 'stefanhasenberg.de'`,
      language,
    );
  }

  public async getCmsPage(
    language: 'de' | 'en',
    docRef: string,
  ): Promise<TranslatedPage[]> {
    return this.performCmsQuery<TranslatedPage[]>(
      undefined,
      docRef,
      `"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
            pageTitle,
            pageDescription,
            language,
            content,
            robots,
            relativeUrl
          }`,
      undefined,
      language,
    );
  }

  public async getCmsArticlePage(
    language: 'de' | 'en',
    seoName: string,
  ): Promise<ArticlePage> {
    return this.performCmsQuery<ArticlePage>(
      'article',
      undefined,
      `_id,
            category,
            headline,
            subheadline,
            content,
            image,
            published,
            urlPath,
            seoName,
            author`,
      `seoName == '${seoName}'`,
      language,
    );
  }

  private async performCmsQuery<T extends object | string>(
    docType?: string,
    docId?: string,
    fields?: string,
    additonalQueryString?: string,
    language?: 'de' | 'en',
  ): Promise<T> {
    return this.client.fetch(
      `*[${
        docType ? `_type == '${docType}' ` : docId ? `_id == '${docId}' ` : ''
      }${language ? ` && language == '${language}' ` : ''}${additonalQueryString ? ` && ${additonalQueryString}` : ''}]${fields ? `{${fields}}` : ''} | order(_createdDate desc)`,
    );
  }
}
