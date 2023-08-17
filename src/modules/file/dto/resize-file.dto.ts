import { Property } from 'cumuco-nestjs';

export class ResizeFileDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: 'width' } })
  width?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: 'height' } })
  height?: number;
}
