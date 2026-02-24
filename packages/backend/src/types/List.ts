import {ApiProperty} from "@nestjs/swagger";


export class PageRef {
    @ApiProperty()
    "relativeUrl": string;
}

export class ListItem {
    @ApiProperty()
    _key: string;
    @ApiProperty()
    _type: "listitem";
    @ApiProperty()
    pageRef: PageRef;
    @ApiProperty()
    text: string;
    @ApiProperty()
    href: string;
    @ApiProperty()
    muiicon: string;
}

export class List {
    @ApiProperty()
    _type: "list";
    @ApiProperty({ type: ListItem, isArray: true})
    listItems: ListItem[];
}