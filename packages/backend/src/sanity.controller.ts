import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SanityService } from './sanity.service';
import { PageInfo, PageLayout, TranslatedPage } from './types/Pages';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { Image } from './types/Image';
import { ArticlePage } from './types/Article';
import type { SanityImageObject } from '@sanity/image-url';

@Controller('cms')
@ApiExtraModels(PageInfo)
export class SanityController {
  constructor(private readonly sanityService: SanityService) {}

  @Get(':language/pages')
  @ApiOkResponse({
    description: 'List of all pages',
    type: PageInfo,
    isArray: true, // <= diff is here
  })
  async getPages(
    @Param('language') language: 'de' | 'en',
  ): Promise<PageInfo[]> {
    return await this.sanityService.getPages(language);
  }

  @Get(':language/page/layout')
  @ApiOkResponse({
    description: 'List of all pages',
    type: PageLayout,
    isArray: false,
  })
  async getPageLayout(
    @Param('language') language: 'de' | 'en',
  ): Promise<PageLayout> {
    return (await this.sanityService.getPageLayout(language))?.[0];
  }

  @Get(':language/page/:id')
  @ApiOkResponse({
    description: 'Retrieve a complete page structure',
    type: TranslatedPage,
    isArray: false,
  })
  async getPage(
    @Param('language') language: 'de' | 'en',
    @Param('id') id: string,
  ): Promise<TranslatedPage> {
    return (await this.sanityService.getCmsPage(language, id))?.[0];
  }

  @Get(':language/content/:id')
  @ApiOkResponse({
    description: 'Retrieve content',
    type: Object,
    isArray: true,
  })
  async getContentReference(
    @Param('language') language: 'de' | 'en',
    @Param('id') id: string,
  ): Promise<string> {
    return await this.sanityService.getContentReference(language, id);
  }

  @Post(':language/image/:name')
  @ApiOkResponse({
    description: 'Retrieve image paths',
    type: Image,
    isArray: false,
  })
  getImage(
    @Param('name') name: string,
    @Body() imgSrc: SanityImageObject,
  ): Image {
    console.log('Image obj', imgSrc);
    return this.sanityService.getImage(name, imgSrc);
  }

  @Get(':language/article/:seoName')
  @ApiOkResponse({
    description: 'Retrieve image paths',
    type: ArticlePage,
    isArray: false,
  })
  async getArticle(
    @Param('language') language: 'de' | 'en',
    @Param('seoName') seoName: string,
  ): Promise<ArticlePage> {
    return await this.sanityService.getCmsArticlePage(language, seoName);
  }
}
