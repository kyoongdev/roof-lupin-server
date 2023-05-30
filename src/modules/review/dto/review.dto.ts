import { SpaceReview } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { DateDTO } from '@/common';

type Props = Partial<SpaceReview>;

export class ReviewDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({ apiProperty: { type: 'number' } })
  score: number;

  @Property({ apiProperty: { type: 'string' } })
  userId: string;

  //TODO: user dto 생성 시 수정
  constructor(props: Props) {
    super();
    this.content = props.content;
    this.score = props.score;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
