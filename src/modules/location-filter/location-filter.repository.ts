import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

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
  }
}
