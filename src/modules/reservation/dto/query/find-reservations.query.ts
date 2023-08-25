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

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '다가오는 예약 여부' } })
  isApproaching?: boolean;

  generateQuery(userId?: string): Prisma.ReservationFindManyArgs {
    const currentDate = new Date();
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

        ...(typeof this.isApproaching === 'boolean' && {
          AND: [
            {
              year: {
                gte: currentDate.getFullYear(),
              },
              month: {
                gte: currentDate.getMonth(),
              },
              day: {
                gte: currentDate.getDate(),
              },
            },
            {
              cancel: null,
              refunds: {
                isNot: null,
              },
              deletedAt: null,
            },
          ],
        }),
      },
    };
  }
}
