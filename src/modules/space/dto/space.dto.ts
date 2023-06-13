import { Prisma } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { FindSpacesQuery } from './query';
import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  cost: number;
  isBest?: boolean;
  isInterested?: boolean;
  thumbnail: string;
  publicTransportation?: TransportationDTOProps; //대중 교통
  location: LocationDTOProps;
}

export class SpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'number', description: '공간 평점' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } })
  reviewCount: number;

  @Property({ apiProperty: { type: 'number', description: '공간 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 베스트 여부' } })
  isBest: boolean | null;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '찜 여부' } })
  isInterested: boolean | null;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: TransportationDTO, nullable: true, description: '공간 대중 교통' } })
  publicTransportation: TransportationDTO | null;

  @Property({ apiProperty: { type: LocationDTO, nullable: true, description: '공간 위치' } })
  location: LocationDTO | null;

  constructor(props: SpaceDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
    this.cost = props.cost;
    this.isBest = typeof props.isBest === 'boolean' ? props.isBest : null;
    this.isInterested = typeof props.isInterested === 'boolean' ? props.isInterested : null;
    this.thumbnail = props.thumbnail;
    this.publicTransportation = props.publicTransportation ? new TransportationDTO(props.publicTransportation) : null;
    this.location = props.location ? new LocationDTO(props.location) : null;
  }

  static findSpacesFindManyClause(query: FindSpacesQuery): Prisma.SpaceFindManyArgs {
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

    const excludeIds =
      excludeSpaces.length > 0 ? Prisma.sql`AND sp.id NOT IN (${Prisma.join(excludeSpaces, ',')})` : Prisma.sql``;
    const includeIds = includeSpaces ? Prisma.sql`AND sp.id IN (${Prisma.join(includeSpaces, ',')})` : Prisma.sql``;
    const where = Prisma.sql`WHERE ${userCountWhere} ${categoryWhere} ${locationWhere} ${excludeIds} ${includeIds}`;
    return where;
  }
}
