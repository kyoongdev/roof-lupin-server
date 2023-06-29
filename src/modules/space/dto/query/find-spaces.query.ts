import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

import { SPACE_SORT_OPTION, SPACE_SORT_OPTION_VALUES, SpaceSortValidation } from '../validation/space-sort.validation';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '인원수 필터' } })
  userCount?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 명' } })
  category?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 id들 (,를 통해 구분합니다.)' } })
  categoryIds?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '위도' } })
  lat?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '경도' } })
  lng?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '거리 - 위도 경도 검색시 필수' } })
  distance?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '지역명', example: '강동구' } })
  locationName?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 일' } })
  day?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 시간' } })
  time?: number;

  @SpaceSortValidation()
  @Property({ apiProperty: { type: 'string', nullable: true, enum: SPACE_SORT_OPTION_VALUES } })
  sort?: keyof typeof SPACE_SORT_OPTION;

  findSpacesFindManyClause(userId?: string): Prisma.SpaceFindManyArgs {
    let orderBy: Prisma.Enumerable<Prisma.SpaceOrderByWithRelationInput> = {
      createdAt: 'desc',
    };

    if (this.sort === 'POPULARITY') {
      orderBy = [
        {
          userInterests: {
            _count: 'desc',
          },
        },
        {
          averageScore: 'desc',
        },
        {
          reviews: {
            _count: 'desc',
          },
        },
      ];
    } else if (this.sort === 'RECENT') {
      orderBy = {
        createdAt: 'desc',
      };
    } else if (this.sort === 'PRICE_HIGH') {
      orderBy = {
        minCost: 'desc',
      };
    } else if (this.sort === 'PRICE_LOW') {
      orderBy = {
        minCost: 'asc',
      };
    }
    return {
      where: {
        ...(this.userCount && {
          minUser: {
            lte: this.userCount,
          },
        }),
        ...(this.category && {
          categories: {
            some: {
              category: {
                name: {
                  contains: this.category,
                },
              },
            },
          },
        }),
        ...(this.categoryIds && {
          categories: {
            some: {
              OR: this.categoryIds.split(',').map((categoryId) => ({ categoryId })),
            },
          },
        }),

        ...(this.locationName && {
          location: {
            OR: [
              {
                jibunAddress: {
                  contains: this.locationName,
                },
              },
              {
                roadAddress: {
                  contains: this.locationName,
                },
              },
            ],
          },
        }),
        ...(userId && {
          NOT: [
            {
              reports: {
                some: {
                  userId,
                },
              },
            },
          ],
        }),
      },
      orderBy,
    };
  }
  generateSqlWhereClause(excludeSpaces: string[], includeSpaces?: string[]) {
    const userCountWhere = this.userCount ? Prisma.sql`minUser <= ${this.userCount}` : Prisma.sql`1=1`;
    const locationWhere = this.locationName
      ? Prisma.sql`AND (sl.jibunAddress LIKE '%${Prisma.raw(this.locationName)}%' OR sl.roadAddress LIKE '%${Prisma.raw(
          this.locationName
        )}%')`
      : Prisma.sql``;

    const categoryWhere = this.category ? Prisma.sql`AND ca.name LIKE '%${Prisma.raw(this.category)}%'` : Prisma.sql``;
    const categoryIdWhere = this.categoryIds
      ? Prisma.sql`AND ca.id IN (${Prisma.join(this.categoryIds.split(','), ',')})`
      : Prisma.sql``;

    const excludeIds =
      excludeSpaces.length > 0 ? Prisma.sql`AND sp.id NOT IN (${Prisma.join(excludeSpaces, ',')})` : Prisma.sql``;
    const includeIds =
      includeSpaces.length > 0 ? Prisma.sql`AND sp.id IN (${Prisma.join(includeSpaces, ',')})` : Prisma.sql``;
    const where = Prisma.sql`WHERE ${userCountWhere} ${categoryWhere} ${categoryIdWhere} ${locationWhere} ${excludeIds} ${includeIds}`;
    return where;
  }
}
