import { Injectable } from '@nestjs/common';
import { SanityClient, createClient } from '@sanity/client';

@Injectable()
export class SanityService {
    private readonly client: SanityClient = createClient({
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: process.env.SANITY_API_VERSION,
        useCdn: true,
        token: process.env.SANITY_TOKEN
    });

    public async getContentReference(language: ('de' | 'en'), docRef: string): Promise<string> {
        return this.performCmsQuery(undefined, docRef, undefined, undefined, language);
    }

    public async getPages(language: ('de' | 'en')): Promise<string> {
        return this.performCmsQuery("page", undefined, `_id,relativeUrl,language`, undefined, language);
    }

    public async getPageLayout(language: ('de' | 'en')): Promise<string> {
        return this.performCmsQuery( "pagelayout", undefined, `
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
    }`, ` && theme == 'stefanhasenberg.de'`, language);
    }

    public async getCmsPage(language: ('de' | 'en'), docRef: string) {
        return this.performCmsQuery(undefined, docRef, `"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
            pageTitle,
            pageDescription,
            language,
            content,
            robots,
            relativeUrl
          }`, undefined, language);
    }

    private async performCmsQuery(docType?: string,
                          docId?: string,
                          fields?: string,
                          additonalQueryString?: string,
                          language?: ("de"|"en")): Promise<string> {
        return this.client.fetch(`*[${
            docType ?
                `_type == '${docType}' `
                : (docId ?
                    `_id == '${docId}' `
                    : '')
        }${language ? ` && language == '${language}' ` : ''}${additonalQueryString ? ` ${additonalQueryString}` : ''}]${fields ? `{${fields}}` : ''} | order(_createdDate desc)`);
    }
}