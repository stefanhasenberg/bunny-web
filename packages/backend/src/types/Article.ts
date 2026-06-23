import { ApiProperty } from '@nestjs/swagger';
import { Grid } from './Grid';
import type { SanityImageObject } from '@sanity/image-url';

export class ArticleGridColumn {
  @ApiProperty()
  type: 'image' | 'richtext';
  @ApiProperty()
  index: number;
  @ApiProperty()
  text?: string;
  @ApiProperty()
  src?: string;
  @ApiProperty()
  alt?: string;
  @ApiProperty()
  srcSet?: string;
}

export class ArticleGridRow {
  [key: string]: ArticleGridColumn;
}

export class ArticleGrid {
  @ApiProperty({ type: Number, isArray: true })
  columnSizes?: number[];
  @ApiProperty({ type: ArticleGridRow, isArray: true })
  rows?: ArticleGridRow[];
}

export class ArticlePage {
  @ApiProperty()
  _id?: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  headline?: string;
  @ApiProperty()
  subheadline?: string;
  @ApiProperty()
  content?: Grid;
  @ApiProperty()
  image?: SanityImageObject;
  @ApiProperty()
  published?: boolean;
  @ApiProperty()
  urlPath?: string;
  @ApiProperty()
  seoName?: string;
  @ApiProperty()
  author?: string;
}
