import { Property } from 'wemacu-nestjs';

export interface UpdateSearchRecommendDTOProps {
  content: string;
}

export class UpdateSearchRecommendDTO {
  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  content: string;

  constructor(props?: UpdateSearchRecommendDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
