import { Property } from 'cumuco-nestjs';

import { LocationFilterTopicDTOProps } from './location-filter-topic.dto';

export interface LocationFilterDTOProps {
  id: string;
  topics: LocationFilterTopicDTOProps[];
}
export class LocationFilterDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '필터 이름 - 화면에 보여주는 용도' } })
  name: string;

  constructor(props: LocationFilterDTOProps) {
    this.id = props.id;
    this.name = props.topics.map((topic) => topic.name).join(', ');
  }
}
