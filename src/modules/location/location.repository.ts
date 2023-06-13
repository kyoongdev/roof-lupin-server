import { Injectable } from '@nestjs/common';

import { Prisma, Space, SpaceLocation } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import {} from 'prisma';
import { PrismaService } from '@/database/prisma.service';

import { FindSpacesQuery } from '../space/dto/query';
import { FindByLocationQuery } from '../space/dto/query/find-by-location.query';

import { LatLngDTO } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private readonly database: PrismaService) {}

  async getLocationsByDistance(paging: PagingDTO, query: FindByLocationQuery) {
    const locations: SpaceLocation[] = await this.database.$queryRaw`
    SELECT *,
	  (6371*acos(cos(radians(${query.lat}))*cos(radians(lat))*cos(radians(lng)
	  -radians(${query.lng}))+sin(radians(${query.lat}))*sin(radians(lat))))
	  AS distance
    FROM SpaceLocation
    HAVING distance <= ${query.distance}
    ORDER BY distance 
    LIMIT ${paging.page ?? 0},${paging.limit ?? 10}
    `;

    return locations;
  }

  async getSpaceWithLocationsByDistance(query: FindSpacesQuery, excludeSpaces: string[], includeSpaces?: string[]) {
    const where = query.userCount ? Prisma.sql`minUser <= ${query.userCount}` : Prisma.sql`1=1`;
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

    const locations: (Space & { distance: number })[] = await this.database.$queryRaw`
        SELECT sp.id,
        (6371*acos(cos(radians(${query.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
        -radians(${query.lng}))+sin(radians(${query.lat}))*sin(radians(sl.lat))))
        AS distance
        FROM Space sp
        INNER JOIN SpaceLocation sl ON sp.id = sl.spaceId
        INNER JOIN SpaceCategory sc ON sp.id = sc.spaceId 
        INNER JOIN Category ca ON sc.categoryId = ca.id 
        WHERE ${where} ${categoryWhere} ${locationWhere} ${excludeIds} ${includeIds}
        ORDER BY distance 
        LIMIT ${query.page ?? 0},${query.limit ?? 10}
    `;

    console.log(locations);
    return locations;
  }
}
