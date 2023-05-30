import { Image, SpaceReview, User } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { DateDTO } from '@/common';
import { ImageDTO } from '@/modules/file/dto';
import { CommonUserDTO } from '@/modules/user/dto';

interface Props extends Partial<SpaceReview> {
  user: Partial<User>;
  images: { image: Image }[];
}

export class ReviewDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string' } })
  content: string;

  @Property({
    apiProperty: { type: 'number' },
  })
  score: number;

  @Property({ apiProperty: { type: 'string', isArray: true } })
  images: ImageDTO[];

  @Property({ apiProperty: { type: CommonUserDTO } })
  user: CommonUserDTO;

  constructor(props: Props) {
    super();
    this.content = props.content;
    this.score = props.score;
    this.user = new CommonUserDTO(props.user);
    this.images = props.images.map(({ image }) => new ImageDTO(image));
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
