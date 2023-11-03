import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { getDayWithWeek } from '@/common/date';
import { RESERVATION_STATUS } from '@/interface/reservation.interface';
import { ReservationStatusReqDecorator } from '@/modules/reservation/dto/validation/status.validation';

export class HostFindReservationsQuery {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '연' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '일' } })
  day?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주차' } })
  week?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '결제수단', enum: ['TOSS', 'NAVER', 'KAKAO'] },
  })
  payMethod?: string;

  @ReservationStatusReqDecorator(true)
  status?: keyof typeof RESERVATION_STATUS;

  generateQuery(): Prisma.ReservationFindManyArgs {
    const reviewableDate = new Date();
    reviewableDate.setMonth(reviewableDate.getMonth() - 1);
    reviewableDate.setDate(0);
    const weekDate = getDayWithWeek(this.year, this.month, this.week);

    return {
      where: {
        ...(this.year && { year: Number(this.year) }),
        ...(this.month && { month: Number(this.month) }),
        ...(this.day && {
          OR: [
            { day: Number(this.day) },
            {
              day: Number(this.day) - 1,
              rentalTypes: {
                some: {
                  endAt: {
                    gte: 24,
                  },
                },
              },
            },
          ],
        }),
        ...(weekDate && {
          OR: [
            {
              day: {
                gte: weekDate.startDate.getDate(),
                lte: weekDate.endDate.getDate(),
              },
            },
            {
              day: weekDate.startDate.getDate() - 1,
              rentalTypes: {
                some: {
                  endAt: {
                    gte: 24,
                  },
                },
              },
            },
          ],
        }),
        ...(this.spaceId && {
          rentalTypes: {
            some: {
              rentalType: {
                spaceId: this.spaceId,
              },
            },
          },
        }),
        ...(this.status === RESERVATION_STATUS.APPROVED && {
          space: {
            isImmediateReservation: false,
          },
          isApproved: true,
        }),
        ...(this.status === RESERVATION_STATUS.APPROVED_PENDING && {
          space: {
            isImmediateReservation: false,
          },
          isApproved: false,
        }),
        ...(this.status === RESERVATION_STATUS.BEFORE_USAGE && {
          OR: [
            {
              isApproved: true,
              space: {
                isImmediateReservation: false,
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
                isImmediateReservation: true,
              },
            },
          ],
        }),

        ...(this.status === RESERVATION_STATUS.CANCELED && {
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
        ...(this.status === 'PAYED' && {
          payedAt: {
            not: null,
          },
        }),
        ...(this.payMethod && {
          payMethod: this.getPayMethod(),
        }),
      },
    };
  }

  getPayMethod() {
    if (this.payMethod === 'TOSS') return '토스페이';
    if (this.payMethod === 'NAVER') return '네이버페이';
    if (this.payMethod === 'KAKAO') return '카카오페이';
    else return undefined;
  }
}
