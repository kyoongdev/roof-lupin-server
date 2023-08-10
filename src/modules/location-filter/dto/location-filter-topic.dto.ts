import { Property } from 'cumuco-nestjs';

export interface LocationFilterTopicDTOProps {
  id: string;
  name: string;
}

export class LocationFilterTopicDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  constructor(props: LocationFilterTopicDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
