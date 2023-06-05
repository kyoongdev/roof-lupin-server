import { Property } from 'wemacu-nestjs';

export interface SearchRecommendDTOProps {
  id: string;
  content: string;
  createdAt: Date;
}

export class SearchRecommendDTO {
  @Property({ apiProperty: { type: 'string', description: 'search record id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  content: string;

  constructor(props: SearchRecommendDTOProps) {
    this.id = props.id;
    this.content = props.content;
  }
}
