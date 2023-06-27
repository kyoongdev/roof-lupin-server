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

  static findSpacesFindManyClause(query: FindSpacesQuery, userId?: string): Prisma.SpaceFindManyArgs {
    let orderBy: Prisma.Enumerable<Prisma.SpaceOrderByWithRelationInput> = {
      createdAt: 'desc',
    };

    if (query.sort === 'POPULARITY') {
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
    } else if (query.sort === 'RECENT') {
      orderBy = {
        createdAt: 'desc',
      };
    } else if (query.sort === 'PRICE_HIGH') {
      orderBy = {
        minCost: 'desc',
      };
    } else if (query.sort === 'PRICE_LOW') {
      orderBy = {
        minCost: 'asc',
      };
    }
    return {
      where: {
        ...(query.userCount && {
          minUser: {
            lte: query.userCount,
          },
        }),
        ...(query.category && {
          categories: {
            some: {
              category: {
                name: {
                  contains: query.category,
                },
              },
            },
          },
        }),
        ...(query.categoryIds && {
          categories: {
            some: {
              OR: query.categoryIds.split(',').map((categoryId) => ({ categoryId })),
            },
          },
        }),

        ...(query.locationName && {
          location: {
            OR: [
              {
                jibunAddress: {
                  contains: query.locationName,
                },
              },
              {
                roadAddress: {
                  contains: query.locationName,
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
  static generateSqlWhereClause(query: FindSpacesQuery, excludeSpaces: string[], includeSpaces?: string[]) {
    const userCountWhere = query.userCount ? Prisma.sql`minUser <= ${query.userCount}` : Prisma.sql`1=1`;
    const locationWhere = query.locationName
      ? Prisma.sql`AND (sl.jibunAddress LIKE '%${Prisma.raw(
          query.locationName
        )}%' OR sl.roadAddress LIKE '%${Prisma.raw(query.locationName)}%')`
      : Prisma.sql``;

    const categoryWhere = query.category
      ? Prisma.sql`AND ca.name LIKE '%${Prisma.raw(query.category)}%'`
      : Prisma.sql``;
    const categoryIdWhere = query.categoryIds
      ? Prisma.sql`AND ca.id IN (${Prisma.join(query.categoryIds.split(','), ',')})`
      : Prisma.sql``;

    const excludeIds =
      excludeSpaces.length > 0 ? Prisma.sql`AND sp.id NOT IN (${Prisma.join(excludeSpaces, ',')})` : Prisma.sql``;
    const includeIds =
      includeSpaces.length > 0 ? Prisma.sql`AND sp.id IN (${Prisma.join(includeSpaces, ',')})` : Prisma.sql``;
    const where = Prisma.sql`WHERE ${userCountWhere} ${categoryWhere} ${categoryIdWhere} ${locationWhere} ${excludeIds} ${includeIds}`;
    return where;
  }
}
