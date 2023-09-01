import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

import { RESERVATION_STATUS, ReservationStatusReqDecorator } from '../validation/status.validation';

export class FindReservationQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } })
  isApproved?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '취소 여부' } })
  isCanceled?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '리뷰 작성 여부' } })
  isReviewed?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '다가오는 예약 여부' } })
  isApproaching?: boolean;

  @ReservationStatusReqDecorator(true)
  status?: keyof typeof RESERVATION_STATUS;

  generateQuery(userId?: string): Prisma.ReservationFindManyArgs {
    const currentDate = new Date();
    return {
      where: {
        ...(this.status === 'APPROVED_PENDING' && {
          isApproved: false,
          spaceReviews: {
            some: {
              space: {
                isImmediateReservation: true,
              },
            },
          },
        }),
        ...(this.status === 'BEFORE_USAGE' && {
          OR: [
            {
              isApproved: true,
              space: {
                isImmediateReservation: true,
              },
              payedAt: {
                not: null,
              },
            },
            {
              payedAt: {
                not: null,
              },
              space: {
                isImmediateReservation: false,
              },
            },
          ],
        }),
        ...((typeof this.isApproved === 'boolean' || this.status === 'APPROVED') && {
          isApproved: this.isApproved,
          spaceReviews: {
            some: {
              space: {
                isImmediateReservation: true,
              },
            },
          },
        }),
        ...((typeof this.isCanceled === 'boolean' ||
          this.status === 'HOST_CANCELED' ||
          this.status === 'USER_CANCELED') && {
          ...(this.isCanceled
            ? {
                cancel: {
                  isNot: null,
                },
              }
            : {
                cancel: {
                  is: null,
                },
              }),
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
        ...(Boolean(this.isApproaching) && {
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
              payedAt: {
                not: null,
              },
              cancel: null,
              refunds: null,
              deletedAt: null,
            },
          ],
        }),
      },
    };
  }
}
