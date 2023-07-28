import { Property } from 'cumuco-nestjs';

export interface IconInUseDTOProps {
  inUse: boolean;
}

export class IconInUseDTO {
  @Property({ apiProperty: { type: 'boolean', description: '사용중' } })
  inUse: boolean;

  constructor(props: IconInUseDTOProps) {
    this.inUse = props.inUse;
  }
}
