import { Property } from 'cumuco-nestjs';

export interface CreateSearchRecommendDTOProps {
  content: string;
}

export class CreateSearchRecommendDTO {
  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  content: string;

  constructor(props?: CreateSearchRecommendDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
