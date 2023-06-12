import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { RentalTypeRepository } from './rentalType.repository';

@Injectable()
export class RentalTypeService {
  constructor(private readonly rentalTypeRepository: RentalTypeRepository) {}

  async findSpaceRentalTypes(spaceId: string, args = {} as Prisma.RentalTypeFindManyArgs) {
    return await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
        ...args.where,
      },
    });
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    return await this.rentalTypeRepository.findSpaceRentalTypeDetail(spaceId);
  }
}
