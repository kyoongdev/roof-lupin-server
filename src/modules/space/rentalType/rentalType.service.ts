import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { SpaceRepository } from '../space.repository';

@Injectable()
export class RentalTypeService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpaceRentalTypes(spaceId: string, args = {} as Prisma.RentalTypeFindManyArgs) {
    return await this.spaceRepository.findSpaceRentalTypes(spaceId, args);
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    return await this.spaceRepository.findSpaceRentalTypeDetail(spaceId);
  }
}
