import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class AdminFindUserCouponsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  generateQuery(): Prisma.UserCouponFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
      },
    };
  }
}
