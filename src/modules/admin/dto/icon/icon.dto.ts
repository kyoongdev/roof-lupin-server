import { Property } from 'cumuco-nestjs';

export interface IconDTOProps {
  id: string;
  name: string;
  url: string;
  inUse?: boolean;
}

export class IconDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '아이콘 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '아이콘 경로' } })
  url: string;

  @Property({ apiProperty: { type: 'boolean', description: '사용여부' } })
  inUse: boolean;

  constructor(props: IconDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.url = props.url;
    this.inUse = props.inUse;
  }
}
