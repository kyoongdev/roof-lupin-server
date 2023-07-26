import { Property } from 'cumuco-nestjs';

export interface CreateSizeDTOProps {
  size: number;
  floor: string;
}

export class CreateSizeDTO {
  @Property({ apiProperty: { type: 'number', description: '면적' } })
  size: number;

  @Property({ apiProperty: { type: 'string', description: '층수' } })
  floor: string;

  constructor(props?: CreateSizeDTOProps) {
    if (props) {
      this.size = props.size;
      this.floor = props.floor;
    }
  }
}
