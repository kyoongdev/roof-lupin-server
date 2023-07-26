import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class FindExhibitionsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 제목' } })
  title?: string;

  generateQuery(): Prisma.ExhibitionFindManyArgs {
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
