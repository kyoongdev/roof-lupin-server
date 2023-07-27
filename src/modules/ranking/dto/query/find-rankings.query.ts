import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class FindRankingsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  generateQuery(): Prisma.RankingFindManyArgs {
    return {
      where: {
        ...(this.name && {
          name: {
            contains: this.name,
          },
        }),
      },
    };
  }
}
