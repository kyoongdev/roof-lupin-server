import { Property } from 'cumuco-nestjs';

import { ScoreValidation } from './validation';
interface Props {
  content?: string;
  score?: number;
  images?: string[];
}

export class UpdateMyReviewDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'number', nullable: true } })
  @ScoreValidation({ message: '별점은 0~5 사이의 정수만 가능합니다.' })
  score?: number;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '이미지 url' } })
  images?: string[];

  constructor(props?: Props) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
      this.images = props.images;
    }
  }
}
