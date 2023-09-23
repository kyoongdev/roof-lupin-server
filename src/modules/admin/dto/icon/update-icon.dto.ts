import { Property } from 'cumuco-nestjs';

export interface UpdateIconDTOProps {
  inUse?: boolean;
  name?: string;
}

export class UpdateIconDTO {
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '사용중인지 여부' } })
  inUse?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  constructor(props?: UpdateIconDTOProps) {
    if (props) {
      this.inUse = props.inUse;
      this.name = props.name;
    }
  }
}
