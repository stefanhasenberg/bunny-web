import {Controller, Get, Param} from "@nestjs/common";
import {SanityService} from "./sanity.service";

@Controller('cms')
export class SanityController {
    constructor(private readonly sanityService: SanityService) {}

    @Get(':language/pages')
    async getPages(@Param("language") language: ("de" | "en")): Promise<string> {
        return await this.sanityService.getPages(language);
    }

    @Get(':language/page/layout')
    async getPageLayout(@Param("language") language: ("de" | "en")): Promise<string> {
        return await this.sanityService.getPageLayout(language);
    }

    @Get(':language/page/:id')
    async getPage(@Param("language") language: ("de" | "en"), @Param("id") docRef): Promise<string> {
        return await this.sanityService.getCmsPage(language, docRef);
    }

    @Get(':language/content/:id')
    async getContentReference(@Param("language") language: ("de" | "en"), @Param("id") docRef): Promise<string> {
        return await this.sanityService.getContentReference(language, docRef);
    }
}