import { Property } from 'wemacu-nestjs';

export interface UpdateSizeDTOProps {
  size: number;
}

export class UpdateSizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적' } })
  size: number;

  constructor(props?: UpdateSizeDTOProps) {
    if (props) {
      this.size = props.size;
    }
  }
}
