import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class AdminFindCouponsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'name', nullable: true, description: '쿠폰 이름' } })
  name: string;

  generateQuery(): Prisma.CouponFindManyArgs {
    return {
      where: {
        ...(this.name && {
          name: {
            contains: this.name,
          },
        }),
      },
    };
  }
}
