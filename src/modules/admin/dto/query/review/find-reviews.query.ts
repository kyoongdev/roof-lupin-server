import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class AdminFindReviewsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  generateQuery(): Prisma.SpaceReviewFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
        ...(this.spaceId && {
          spaceId: this.spaceId,
        }),
      },
    };
  }
}
