import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

export class FindHolidayDTO {
  @Property({ apiProperty: { type: 'number', description: '연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '월' } })
  month: number;

  generateQuery(): Prisma.HolidayFindManyArgs {
    return {
      where: {
        year: this.year,
        month: this.month,
      },
    };
  }
}
