import { ApiProperty } from '@nestjs/swagger';

export class ImageSourceItem {
  @ApiProperty()
  media: string;
  @ApiProperty()
  srcSet: string;
}

export class Image {
  @ApiProperty()
  src: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ isArray: true, type: ImageSourceItem })
  sourceItems: ImageSourceItem[];
}
