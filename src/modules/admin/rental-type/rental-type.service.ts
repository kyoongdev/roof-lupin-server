import { Injectable } from '@nestjs/common';

import { RentalTypeRepository } from '@/modules/rental-type/rental-type.repository';

@Injectable()
export class AdminRentalTypeService {
  constructor(private readonly rentalTypeRepository: RentalTypeRepository) {}

  async getSpaceRentalTypes(spaceId: string) {
    const rentalTypes = await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
      },
    });

    return rentalTypes;
  }
}
