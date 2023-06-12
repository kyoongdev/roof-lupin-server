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
    console.log({ excludeSpaces, includeSpaces });
    const excludeIds =
      excludeSpaces.length > 0 ? Prisma.sql`AND sp.id NOT IN (${Prisma.join(excludeSpaces, ',')})` : Prisma.sql``;
    const includeIds = includeSpaces ? Prisma.sql`AND sp.id IN (${Prisma.join(includeSpaces, ',')})` : Prisma.sql``;

    const locations: (Space & { distance: number })[] = await this.database.$queryRaw`
        SELECT *,
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
    /**
     * Query: SELECT `roof`.`Space`.`id`, `roof`.`Space`.`title`,
     *  `roof`.`Space`.`description`, `roof`.`Space`.`spaceType`,
     * `roof`.`Space`.`buildingType`, `roof`.`Space`.`thumbnail`, `roof`.`Space`.`minUser`,
     * `roof`.`Space`.`maxUser`, `roof`.`Space`.`overflowUserCost`, `roof`.`Space`.`overflowUserCount`,
     * `roof`.`Space`.`minCost`, `roof`.`Space`.`minSize`, `roof`.`Space`.`averageScore`,
     * `roof`.`Space`.`createdAt`, `roof`.`Space`.`updatedAt`, `roof`.`Space`.`deletedAt`,
     *  `roof`.`Space`.`hostId` FROM `roof`.`Space` WHERE (`roof`.`Space`.`minUser` <= ? AND
     *  (`roof`.`Space`.`id`) IN (SELECT `t0`.`id` FROM `roof`.`Space` AS `t0`
     * INNER JOIN `roof`.`SpaceCategory` AS `j0` ON (`j0`.`spaceId`) = (`t0`.`id`)
     *  WHERE ((`j0`.`spaceId`,`j0`.`categoryId`)
     * IN (SELECT `t1`.`spaceId`, `t1`.`categoryId` FROM `roof`.`SpaceCategory` AS `t1` INNER JOIN `roof`.`Category` AS `j1`
     * ON (`j1`.`id`) = (`t1`.`categoryId`)
     *  WHERE (`j1`.`name` = ? AND `t1`.`spaceId` IS NOT NULL AND `t1`.`categoryId` IS NOT NULL))
     * AND `t0`.`id` IS NOT NULL)) AND (`roof`.`Space`.`id`)
     * IN (SELECT `t0`.`id` FROM `roof`.`Space` AS `t0` INNER JOIN `roof`.`SpaceLocation` AS `j0` ON (`j0`.`spaceId`) = (`t0`.`id`)
     * WHERE ((`j0`.`jibunAddress` LIKE ? OR `j0`.`roadAddress` LIKE ?) AND `t0`.`id` IS NOT NULL))) ORDER BY `roof`.`Space`.`createdAt` DESC LIMIT ? OFFSET ?
     */

    console.log(locations.length);
    return locations;
  }
}
