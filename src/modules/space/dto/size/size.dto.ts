import { Property } from 'wemacu-nestjs';

export interface SizeDTOProps {
  id: string;
  size: number;
}

export class SizeDTO {
  @Property({ apiProperty: { type: 'string', description: '면적 id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '면적' } })
  size: number;

  constructor(props: SizeDTOProps) {
    this.id = props.id;
    this.size = props.size;
  }
}
