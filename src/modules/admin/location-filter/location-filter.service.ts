import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import {
  CreateLocationFilterDTO,
  CreateLocationFilterGroupDTO,
  UpdateLocationFilterDTO,
  UpdateLocationFilterGroupDTO,
} from '@/modules/location-filter/dto';
import { LocationFilterRepository } from '@/modules/location-filter/location-filter.repository';

@Injectable()
export class AdminLocationFilterService {
  constructor(private readonly locationFilterRepository: LocationFilterRepository) {}

  async findLocationFilterGroup(id: string) {
    return await this.locationFilterRepository.findLocationFilterGroup(id);
  }

  async findLocationFilterGroups(args = {} as Prisma.LocationFilterGroupFindManyArgs) {
    return await this.locationFilterRepository.findLocationFilterGroups(args);
  }

  async createLocationFilterGroup(data: CreateLocationFilterGroupDTO) {
    return await this.locationFilterRepository.createLocationFilterGroup(data);
  }

  async updateLocationFilterGroup(id: string, data: UpdateLocationFilterGroupDTO) {
    await this.locationFilterRepository.findLocationFilterGroup(id);

    await this.locationFilterRepository.updateLocationFilterGroup(id, data);
  }

  async deleteLocationFilterGroup(id: string) {
    await this.locationFilterRepository.findLocationFilterGroup(id);

    await this.locationFilterRepository.deleteLocationFilterGroup(id);
  }

  async createLocationFilter(data: CreateLocationFilterDTO) {
    await this.locationFilterRepository.findLocationFilterGroup(data.locationFilterGroupId);
    return await this.locationFilterRepository.createLocationFilter(data);
  }

  async updateLocationFilter(id: string, data: UpdateLocationFilterDTO) {
    await this.locationFilterRepository.findLocationFilter(id);
    await this.locationFilterRepository.updateLocationFilter(id, data);
  }

  async deleteLocationFilter(id: string) {
    await this.locationFilterRepository.findLocationFilter(id);
    await this.locationFilterRepository.deleteLocationFilter(id);
  }
}
