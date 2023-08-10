import { Injectable } from '@nestjs/common';

import { LocationFilterRepository } from './location-filter.repository';

@Injectable()
export class LocationFilterService {
  constructor(private readonly locationFilterRepository: LocationFilterRepository) {}

  async findLocationFilter() {
    const locationFilters = await this.locationFilterRepository.findLocationFilters({
      where: {
        group: {
          name: '서울',
        },
      },
    });

    return locationFilters;
  }
}
