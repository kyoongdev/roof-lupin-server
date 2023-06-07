import { Injectable } from '@nestjs/common';

import { SocialLocationService } from 'wemacu-nestjs';

import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly socialLoginService: SocialLocationService
  ) {}

  async findNaverLocation() {
    return await this.socialLoginService.getNaverLocation({
      query: '서울특별시 강남구 봉은사로 120',
    });
  }
}
