import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'wemacu-nestjs';

import { SPACE_SORT_OPTION, SPACE_SORT_OPTION_VALUES, SpaceSortValidation } from '../validation/space-sort.validation';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '검색어' } })
  keyword?: string;

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

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 시작 시간' } })
  startAt?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 종료 시간' } })
  endAt?: number;

  @SpaceSortValidation()
  @Property({ apiProperty: { type: 'string', nullable: true, enum: SPACE_SORT_OPTION_VALUES } })
  sort?: keyof typeof SPACE_SORT_OPTION;

  findSpacesFindManyClause(userId?: string): Prisma.SpaceFindManyArgs {
    let orderBy: Prisma.Enumerable<Prisma.SpaceOrderByWithRelationInput> = {
      createdAt: 'desc',
    };
    if (this.sort === 'RECENT') {
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
        ...(this.keyword && {
          OR: [
            {
              title: {
                contains: this.keyword,
              },
              location: {
                jibunAddress: {
                  contains: this.keyword,
                },
                roadAddress: {
                  contains: this.keyword,
                },
              },
              publicTransportations: {
                some: {
                  name: {
                    contains: this.keyword,
                  },
                },
              },
            },
          ],
        }),
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

  generateSqlWhereClause(excludeSpaces: string[], userId?: string) {
    const userCountWhere = this.userCount ? Prisma.sql`minUser <= ${this.userCount}` : Prisma.empty;
    const locationWhere = this.locationName
      ? Prisma.sql`AND (sl.jibunAddress LIKE '%${Prisma.raw(this.locationName)}%' OR sl.roadAddress LIKE '%${Prisma.raw(
          this.locationName
        )}%')`
      : Prisma.empty;
    const reportWhere = userId
      ? Prisma.sql`AND sp.id NOT IN (SELECT spaceId FROM SpaceReport as sre WHERE sre.userId = ${userId})`
      : Prisma.empty;
    const categoryWhere = this.category ? Prisma.sql`AND ca.name LIKE '%${Prisma.raw(this.category)}%'` : Prisma.empty;
    const categoryIdWhere = this.categoryIds
      ? Prisma.sql`AND ca.id IN (${Prisma.join(this.categoryIds.split(','), ',')})`
      : Prisma.empty;
    const keywordWhere = this.keyword
      ? Prisma.sql`
    AND (sp.title LIKE '%${Prisma.raw(this.keyword)}%'
    OR sl.jibunAddress LIKE '%${Prisma.raw(this.keyword)}%'
    OR sl.roadAddress LIKE '%${Prisma.raw(this.keyword)}%'
    OR pt.name LIKE '%${Prisma.raw(this.keyword)}%'
    OR ht.name LIKE '%${Prisma.raw(this.keyword)}%')`
      : Prisma.empty;

    const excludeIds =
      excludeSpaces.length > 0 ? Prisma.sql`AND sp.id NOT IN (${Prisma.join(excludeSpaces, ',')})` : Prisma.empty;
    const where = Prisma.sql`WHERE sp.isPublic = 1 AND sp.isApproved = 1 ${userCountWhere} ${categoryWhere} ${categoryIdWhere} ${locationWhere} ${excludeIds} ${reportWhere} ${keywordWhere} `;
    return where;
  }
}
