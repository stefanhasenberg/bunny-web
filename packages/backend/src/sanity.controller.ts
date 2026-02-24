import {Controller, Get, Param} from "@nestjs/common";
import {SanityService} from "./sanity.service";
import {PageInfo, PageLayout, TranslatedPage} from "./types/Pages";
import {ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath} from "@nestjs/swagger";
import {Image} from "./types/Image";

@Controller('cms')
@ApiExtraModels(PageInfo)
export class SanityController {
    constructor(private readonly sanityService: SanityService) {}

    @Get(':language/pages')
    @ApiOkResponse({
        description: 'List of all pages',
        type: PageInfo,
        isArray: true // <= diff is here
    })
    async getPages(@Param("language") language: ("de" | "en")): Promise<PageInfo[]> {
        return await this.sanityService.getPages(language);
    }

    @Get(':language/page/layout')
    @ApiOkResponse({
        description: 'List of all pages',
        type: PageLayout,
        isArray: false
    })
    async getPageLayout(@Param("language") language: ("de" | "en")): Promise<PageLayout> {
        return (await this.sanityService.getPageLayout(language))?.[0];
    }

    @Get(':language/page/:id')
    @ApiOkResponse({
        description: 'Retrieve a complete page structure',
        type: TranslatedPage,
        isArray: false
    })
    async getPage(@Param("language") language: ("de" | "en"), @Param("id") id:string): Promise<TranslatedPage> {
        return (await this.sanityService.getCmsPage(language, id))?.[0];
    }

    @Get(':language/content/:id')
    @ApiOkResponse({
        description: 'Retrieve content',
        type: Object,
        isArray: true
    })
    async getContentReference(@Param("language") language: ("de" | "en"), @Param("id") id:string): Promise<string> {
        return await this.sanityService.getContentReference(language, id);
    }

    @Get(':language/image/:name')
    @ApiOkResponse({
        description: 'Retrieve image paths',
        type: Image,
        isArray: false
    })
    async getImage(@Param("name") name: string) : Promise<Image> {
        return await this.sanityService.getImage(name);
    }
}