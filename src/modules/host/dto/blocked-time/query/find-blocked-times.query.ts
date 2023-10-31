import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

import { getDayWithWeek } from '@/common/date';

export class FindBlockedTimesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '연' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '일' } })
  day?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '주차' } })
  week?: number;

  generateQuery(query: FindBlockedTimesQuery): Prisma.BlockedTimeFindManyArgs {
    const weekDate = getDayWithWeek(this.year, this.month, this.week);
    return {
      where: {
        ...(this.year && { year: Number(this.year) }),
        ...(this.month && { month: Number(this.month) }),
        ...(this.day && { day: Number(this.day) }),
        ...(weekDate && {
          day: {
            gte: weekDate.startDate.getDate(),
            lte: weekDate.endDate.getDate(),
          },
        }),
        ...(query.spaceId && {
          spaceId: query.spaceId,
        }),
      },
    };
  }
}
