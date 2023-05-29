import { Property } from 'wemacu-nestjs';
interface Props {
  content?: string;
  score?: number;
  images?: string[];
}

export class UpdateReviewDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { type: 'number', nullable: true } })
  score?: number;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  images?: string[];

  constructor(props?: Props) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
      this.images = props.images;
    }
  }
}
