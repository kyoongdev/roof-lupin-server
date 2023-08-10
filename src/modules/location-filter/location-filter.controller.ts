import { Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { LocationFilterDTO } from './dto';
import { LocationFilterService } from './location-filter.service';

@ApiController('location-filters', '위치 필터')
export class LocationFilterController {
  constructor(private readonly locationFilterService: LocationFilterService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '위치 필터 조회',
      summary: '위치 필터 조회',
    },
  })
  @ResponseApi({
    type: LocationFilterDTO,
    isArray: true,
  })
  async findLocationFilter() {
    return await this.locationFilterService.findLocationFilter();
  }
}
