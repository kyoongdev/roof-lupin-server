import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class AdminFindFAQsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저이름' } })
  userName?: string;

  generateQuery(): Prisma.FAQFindManyArgs {
    return {
      where: {
        ...(this.userName && {
          user: {
            name: {
              contains: this.userName,
            },
          },
        }),
      },
    };
  }
}
