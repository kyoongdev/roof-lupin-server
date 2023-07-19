import { Property } from 'wemacu-nestjs';

export interface HashTagDTOProps {
  id: string;
  name: string;
}

export class HashTagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props: HashTagDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
