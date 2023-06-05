import { Property } from 'wemacu-nestjs';

export interface CreateSizeDTOProps {
  size: number;
}

export class CreateSizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적' } })
  size: number;

  constructor(props?: CreateSizeDTOProps) {
    if (props) {
      this.size = props.size;
    }
  }
}
