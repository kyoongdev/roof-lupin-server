import { Property } from 'wemacu-nestjs';

interface Props {
  content: string;
  images: string[];
  score: number;
  spaceId: string;
}

export class CreateReviewDTO {
  @Property({ apiProperty: { type: 'string', description: '리뷰 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '리뷰 내용' } })
  images: string[];

  @Property({ apiProperty: { type: 'number', description: '별점' } })
  score: number;

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  constructor(props?: Props) {
    if (props) {
      this.content = props.content;
      this.images = props.images;
      this.score = props.score;
      this.spaceId = props.spaceId;
    }
  }
}
