import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class FindReservationQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '취소 여부' } })
  isCanceled?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } })
  isReviewed?: boolean;

  generateQuery(userId?: string): Prisma.ReservationFindManyArgs {
    return {
      where: {
        ...(typeof this.isApproved === 'boolean' && {
          isApproved: this.isApproved,
        }),
        ...(typeof this.isCanceled === 'boolean' && {
          isCanceled: this.isCanceled,
        }),
        ...(typeof this.isReviewed === 'boolean' &&
          userId && {
            spaceReviews: {
              ...(this.isReviewed
                ? {
                    some: {
                      userId,
                    },
                  }
                : {
                    none: {
                      userId,
                    },
                  }),
            },
          }),
      },
    };
  }
}
