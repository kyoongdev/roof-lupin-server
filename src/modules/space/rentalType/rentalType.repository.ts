import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { SpaceRentalTypeDTO } from '../dto/rentalType';

@Injectable()
export class RentalTypeRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpaceRentalType(spaceId: string) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        spaceId,
      },
    });

    return new SpaceRentalTypeDTO(rentalTypes);
  }
}
