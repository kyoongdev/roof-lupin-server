import { Injectable } from '@nestjs/common';

import { Prisma, Space, SpaceLocation } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';

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
}
