import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { PossibleRentalTypeQuery } from '../dto/query';
import { SpaceRepository } from '../space.repository';

import { RentalTypeRepository } from './rentalType.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

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

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    await this.spaceRepository.findSpace(spaceId);
    const rentalTypes = await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
      },
    });
  }

  async findPossibleRentalTypes() {
    //
  }
}
