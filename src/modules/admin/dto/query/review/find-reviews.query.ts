import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class AdminFindReviewsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  generateQuery(): Prisma.SpaceReviewFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
      },
    };
  }
}
