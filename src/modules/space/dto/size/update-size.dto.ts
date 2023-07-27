import { Property } from 'cumuco-nestjs';

export interface UpdateSizeDTOProps {
  size: number;
  floor: number;
  isRoof: boolean;
}

export class UpdateSizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적' } })
  size: number;

  @Property({ apiProperty: { type: 'number', description: '층수' } })
  floor: number;

  @Property({ apiProperty: { type: 'boolean', description: '옥탑여부' } })
  isRoof: boolean;

  constructor(props?: UpdateSizeDTOProps) {
    if (props) {
      this.size = props.size;
      this.floor = props.floor;
      this.isRoof = props.isRoof;
    }
  }
}
