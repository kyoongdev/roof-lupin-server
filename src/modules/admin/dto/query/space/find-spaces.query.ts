import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class AdminFindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } })
  title?: string;

  generateQuery(): Prisma.SpaceFindManyArgs {
    return {
      where: {
        ...(this.title && {
          title: {
            contains: this.title,
          },
        }),
      },
    };
  }
}
