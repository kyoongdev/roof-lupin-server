import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class FindBlockedTimesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  static generateQuery(query: FindBlockedTimesQuery): Prisma.BlockedTimeFindManyArgs {
    return {
      where: {
        ...(query.spaceId && {
          spaceId: query.spaceId,
        }),
      },
    };
  }
}
