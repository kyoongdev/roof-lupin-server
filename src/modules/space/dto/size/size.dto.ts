import { Property } from 'cumuco-nestjs';

export interface SizeDTOProps {
  id: string;
  size: number;
  floor: string;
  isRoof: boolean;
}

export class SizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '면적' } })
  size: number;

  @Property({ apiProperty: { type: 'string', description: '층수' } })
  floor: string;

  @Property({ apiProperty: { type: 'boolean', description: '옥탑여부' } })
  isRoof: boolean;

  constructor(props: SizeDTOProps) {
    this.id = props.id;
    this.size = props.size;
    this.floor = props.floor;
  }
}
