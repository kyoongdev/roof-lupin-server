import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

import { RESERVATION_STATUS, ReservationStatusReqDecorator } from '../validation/status.validation';

export class FindReservationQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '연도' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '일' } })
  day?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

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
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '이용 완료 여부' } })
  isUsed?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '다가오는 예약 여부' } })
  isApproaching?: boolean;

  @ReservationStatusReqDecorator(true)
  status?: keyof typeof RESERVATION_STATUS;

  generateQuery(): Prisma.ReservationFindManyArgs {
    const currentDate = new Date();
    return {
      where: {
        ...(this.year && { year: Number(this.year) }),
        ...(this.month && { month: Number(this.month) }),
        ...(this.day && { day: Number(this.day) }),
        ...(this.spaceId && {
          rentalTypes: {
            some: {
              rentalType: {
                spaceId: this.spaceId,
              },
            },
          },
        }),
        ...(this.status === RESERVATION_STATUS.BEFORE_USAGE && {
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
          space: {
            isImmediateReservation: true,
          },
        }),
        ...(typeof this.isCanceled === 'boolean' && {
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
        ...(this.status === RESERVATION_STATUS.HOST_CANCELED && {
          cancel: {
            isNot: null,
            refundCost: null,
          },
        }),
        ...(this.status === RESERVATION_STATUS.REFUND && {
          cancel: {
            refundCost: {
              not: null,
            },
          },
        }),
        ...(typeof this.isReviewed === 'boolean' && {
          spaceReviews: {
            ...(this.isReviewed
              ? {
                  some: {},
                }
              : {
                  none: {},
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
              cancel: null,
              deletedAt: null,
            },
          ],
        }),
        ...(typeof this.isUsed === 'boolean' && {
          ...(this.isUsed
            ? {
                year: {
                  lte: currentDate.getFullYear(),
                },
                month: {
                  lte: currentDate.getMonth(),
                },
                day: {
                  lt: currentDate.getDate(),
                },
                cancel: null,
                deletedAt: null,
              }
            : {
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
                    deletedAt: null,
                  },
                ],
              }),
        }),
      },
    };
  }
}
