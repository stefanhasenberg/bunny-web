import { ApiProperty } from '@nestjs/swagger';
import { Grid } from './Grid';

export class Footer {
  @ApiProperty()
  _type: 'footer';
  @ApiProperty()
  content: Grid;
}
