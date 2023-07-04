import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 제목' } })
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
