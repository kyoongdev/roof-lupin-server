import { Property } from 'cumuco-nestjs';

import { ScoreValidation } from './validation';

interface Props {
  content: string;
  images: string[];
  score: number;
  spaceId: string;
  reservationId: string;
}

export class CreateReviewDTO {
  @Property({ apiProperty: { type: 'string', description: '리뷰 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '이미지 url' } })
  images: string[];

  @Property({ apiProperty: { type: 'number', description: '별점' } })
  @ScoreValidation({ message: '별점은 0~5 사이의 정수만 가능합니다.' })
  score: number;

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'string', description: '예약 아이디' } })
  reservationId: string;

  constructor(props?: Props) {
    if (props) {
      this.content = props.content;
      this.images = props.images;
      this.score = props.score;
      this.spaceId = props.spaceId;
    }
  }
}
