import { SpaceReview, User } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { DateDTO } from '@/common';
import { CommonUserDTO } from '@/modules/user/dto';

interface Props extends Partial<SpaceReview> {
  user: Partial<User>;
}

export class ReviewDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({
    apiProperty: { type: 'number' },
  })
  score: number;

  @Property({ apiProperty: { type: CommonUserDTO } })
  user: CommonUserDTO;

  //TODO: user dto 생성 시 수정
  constructor(props: Props) {
    super();
    this.content = props.content;
    this.score = props.score;
    this.user = new CommonUserDTO(props.user);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
