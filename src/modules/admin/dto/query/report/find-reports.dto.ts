import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class AdminFindReportsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  generateQuery(): Prisma.SpaceReportFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
      },
    };
  }
}
