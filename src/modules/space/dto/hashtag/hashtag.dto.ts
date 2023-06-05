import { Property } from 'wemacu-nestjs';

interface HashtagDTOProps {
  id: string;
  name: string;
}

export class HashtagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props: HashtagDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
