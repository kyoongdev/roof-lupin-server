import { Property } from 'cumuco-nestjs';

export interface UpdateSizeDTOProps {
  size: number;
  floor: string;
  isRoof: boolean;
}

export class UpdateSizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적' } })
  size: number;

  @Property({ apiProperty: { type: 'string', description: '층수' } })
  floor: string;

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
