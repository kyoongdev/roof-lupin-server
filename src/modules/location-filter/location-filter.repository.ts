import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import {
  CreateLocationFilterDTO,
  CreateLocationFilterGroupDTO,
  LocationFilterDTO,
  LocationFilterGroupDTO,
  UpdateLocationFilterDTO,
  UpdateLocationFilterGroupDTO,
} from './dto';
import { LOCATION_ERROR_CODE } from './exception/errorCode';
import { LocationFilterException } from './exception/location-filter.exception';

@Injectable()
export class LocationFilterRepository {
  constructor(private readonly database: PrismaService) {}

  async findLocationFilterGroup(id: string) {
    const locationFilterGroup = await this.database.locationFilterGroup.findUnique({
      where: {
        id,
      },
      include: {
        locationFilters: {
          include: {
            topics: true,
          },
        },
      },
    });

    if (!locationFilterGroup) {
      throw new LocationFilterException(LOCATION_ERROR_CODE.LOCATION_FILTER_GROUP_NOT_FOUND);
    }
    return new LocationFilterGroupDTO(locationFilterGroup);
  }

  async findLocationFilterGroups(args = {} as Prisma.LocationFilterGroupFindManyArgs) {
    const locationFilterGroups = await this.database.locationFilterGroup.findMany({
      ...args,
      include: {
        locationFilters: {
          include: {
            topics: true,
          },
        },
      },
    });

    return locationFilterGroups.map((locationFilterGroup) => new LocationFilterGroupDTO(locationFilterGroup));
  }

  async findLocationFilter(id: string) {
    const locationFilter = await this.database.locationFilter.findUnique({
      where: {
        id,
      },
      include: {
        topics: true,
      },
    });

    if (!locationFilter) {
      throw new LocationFilterException(LOCATION_ERROR_CODE.LOCATION_FILTER_NOT_FOUND);
    }
    return new LocationFilterDTO(locationFilter);
  }

  async findLocationFilters(args = {} as Prisma.LocationFilterFindManyArgs) {
    const locationFilters = await this.database.locationFilter.findMany({
      ...args,
      include: {
        topics: true,
      },
    });

    return locationFilters.map((locationFilter) => new LocationFilterDTO(locationFilter));
  }

  async createLocationFilterGroup(data: CreateLocationFilterGroupDTO) {
    const locationFilterGroup = await this.database.locationFilterGroup.create({
      data,
    });

    return locationFilterGroup.id;
  }

  async updateLocationFilterGroup(id: string, data: UpdateLocationFilterGroupDTO) {
    await this.database.locationFilterGroup.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteLocationFilterGroup(id: string) {
    await this.database.locationFilterGroup.delete({
      where: {
        id,
      },
    });
  }

  async createLocationFilter(data: CreateLocationFilterDTO) {
    const locationFilter = await this.database.locationFilter.create({
      data: {
        group: {
          connect: {
            id: data.locationFilterGroupId,
          },
        },
        topics: {
          create: data.names.map((name) => ({
            name,
          })),
        },
      },
    });

    return locationFilter.id;
  }

  async updateLocationFilter(id: string, data: UpdateLocationFilterDTO) {
    await this.database.locationFilter.update({
      where: {
        id,
      },
      data: {
        topics: {
          deleteMany: {},
          create: data.names.map((name) => ({
            name,
          })),
        },
      },
    });
  }

  async deleteLocationFilter(id: string) {
    await this.database.locationFilter.delete({
      where: {
        id,
      },
    });
  }
}
