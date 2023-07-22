import { Prisma } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

export class FindHolidayDTO {
  @Property({ apiProperty: { type: 'string', description: '연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  generateQuery(): Prisma.HolidayFindManyArgs {
    return {
      where: {
        year: this.year,
        month: this.month,
      },
    };
  }
}
