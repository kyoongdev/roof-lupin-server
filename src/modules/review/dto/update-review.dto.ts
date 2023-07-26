import { Property } from 'cumuco-nestjs';

import { ScoreValidation } from './validation';
interface Props {
  content?: string;
  score?: number;
  images?: string[];
  isBest?: boolean;
}

export class UpdateReviewDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'number', nullable: true } })
  @ScoreValidation({ message: '별점은 0~5 사이의 정수만 가능합니다.' })
  score?: number;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '이미지 url' } })
  images?: string[];

  @Property({ apiProperty: { type: 'boolean', isArray: true } })
  isBest?: boolean;

  constructor(props?: Props) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
      this.images = props.images;
      this.isBest = props.isBest;
    }
  }
}
