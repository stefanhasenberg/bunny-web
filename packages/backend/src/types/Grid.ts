import { ApiProperty } from '@nestjs/swagger';
import { List } from './List';
import type { SanityImageObject } from '@sanity/image-url';

export class ContentRef {
  @ApiProperty()
  docId: string;
}

export class GridCell {
  @ApiProperty()
  _type: 'gridcell';
  @ApiProperty()
  _key: string;
  @ApiProperty()
  cellRation: string;
  @ApiProperty({ type: Object, isArray: true })
  content: any[];
  @ApiProperty()
  contentType: 'richtext' | 'list' | 'image' | 'contentRef';
  @ApiProperty()
  list: List;
  @ApiProperty()
  padding: 'small' | 'medium' | 'large' | null | undefined;
  @ApiProperty()
  contentRef: ContentRef;
  @ApiProperty()
  image: SanityImageObject;
}

export class GridRow {
  @ApiProperty()
  _type: 'gridrow';
  @ApiProperty()
  _key: string;
  @ApiProperty({ type: GridCell, isArray: true })
  cells: GridCell[];
}

export class Grid {
  @ApiProperty()
  _type: 'grid';
  @ApiProperty({ type: GridRow, isArray: true })
  rows: GridRow[];
}
