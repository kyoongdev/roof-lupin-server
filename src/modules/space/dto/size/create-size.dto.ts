import { Property } from 'cumuco-nestjs';

export interface CreateSizeDTOProps {
  size: number;
  floor: number;
  isRoof: boolean;
}

export class CreateSizeDTO {
  @Property({ apiProperty: { type: 'number', description: '면적' } })
  size: number;

  @Property({ apiProperty: { type: 'number', description: '층수' } })
  floor: number;

  @Property({ apiProperty: { type: 'boolean', description: '옥탑여부' } })
  isRoof: boolean;

  constructor(props?: CreateSizeDTOProps) {
    if (props) {
      this.size = props.size;
      this.floor = props.floor;
      this.isRoof = props.isRoof;
    }
  }
}
