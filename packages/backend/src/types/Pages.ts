import {ApiProperty} from "@nestjs/swagger";
import {Footer} from "./Footer";
import {List} from "./List";
import {TranslatedContent} from "./Generics";
import {Grid} from "./Grid";

export class PageInfo {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    language: ("de" | "en");
    @ApiProperty()
    relativeUrl: string;
}

export class CookieInfo {
    @ApiProperty()
    _ref: string;
    @ApiProperty()
    _type: string;
}

export class PageLayout {
    @ApiProperty()
    _createdAt: string;
    @ApiProperty()
    _id: string;
    @ApiProperty()
    _rev: string;
    @ApiProperty()
    _type: "pagelayout";
    @ApiProperty()
    _updatedAt: string;
    @ApiProperty()
    cookieinfo: CookieInfo;
    @ApiProperty()
    language: ("de" | "en");
    @ApiProperty()
    theme: string;
    @ApiProperty()
    footerref: Footer;
    @ApiProperty()
    navigationmenu: List;
}

export class Page {
    @ApiProperty()
    content: Grid;
    @ApiProperty()
    language: ("de" | "en");
    @ApiProperty()
    pageDescription: string;
    @ApiProperty()
    pageTitle: string;
    @ApiProperty()
    relativeUrl: string;
    @ApiProperty()
    robots: string;
}

export class TranslatedPage extends TranslatedContent<Page> {
    @ApiProperty({type: Page, isArray: true})
    declare _translations;
}