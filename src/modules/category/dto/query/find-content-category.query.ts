import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

export class FindContentCategoryQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  generateQuery(): Prisma.ContentCategoryFindManyArgs {
    return {
      where: {
        ...(this.name && {
          OR: [
            {
              name: {
                contains: this.name,
              },
            },
            {
              highlight: {
                contains: this.name,
              },
            },
          ],
        }),
      },
    };
  }
}
