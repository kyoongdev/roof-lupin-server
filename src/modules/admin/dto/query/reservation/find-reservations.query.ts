import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class AdminFindReservationsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } })
  userName?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 코드' } })
  code?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 연도' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 일' } })
  day?: number;

  generateQuery(): Prisma.ReservationFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
        ...(this.userName && {
          user: {
            name: this.userName,
          },
        }),
        ...(this.code && {
          code: this.code,
        }),
        ...(this.year && {
          year: this.year,
        }),
        ...(this.month && {
          month: this.month,
        }),
        ...(this.day && {
          day: this.day,
        }),
      },
    };
  }
}
