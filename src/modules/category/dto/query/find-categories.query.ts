import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class FindCategoriesQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '홈 화면 유무' } })
  isHome?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '추천 유무' } })
  isRecommend?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name?: string;

  generateQuery(): Prisma.CategoryFindManyArgs {
    return {
      where: {
        ...(typeof this.isHome === 'boolean' && {
          isHome: this.isHome,
        }),
        ...(typeof this.isRecommend === 'boolean' && {
          isRecommend: this.isRecommend,
        }),
        ...(this.name && {
          name: {
            contains: this.name,
          },
        }),
      },
    };
  }
}
