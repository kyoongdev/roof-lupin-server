import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class AdminFindUserCouponsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } })
  username?: string;

  generateQuery(): Prisma.UserCouponFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
        ...(this.username && {
          user: {
            name: {
              contains: this.username,
            },
          },
        }),
      },
    };
  }
}
