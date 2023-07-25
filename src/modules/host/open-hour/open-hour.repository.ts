import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateOpenHourDTO, OpenHourDTO, UpdateOpenHourDTO } from '../dto/openHour';

@Injectable()
export class OpenHourRepository {
  constructor(private readonly database: PrismaService) {}

  async countOpenHours(args = {} as Prisma.OpenHourCountArgs) {
    return await this.database.openHour.count(args);
  }

  async findOpenHours(args = {} as Prisma.OpenHourFindManyArgs) {
    const openHours = await this.database.openHour.findMany(args);

    return openHours.map((openHour) => new OpenHourDTO(openHour));
  }

  async createOpenHour(spaceId: string, data: CreateOpenHourDTO) {
    const openHour = await this.database.openHour.create({
      data: {
        ...data,
        space: {
          connect: {
            id: spaceId,
          },
        },
      },
    });

    return openHour.id;
  }

  async updateOpenHour(id: string, data: UpdateOpenHourDTO) {
    await this.database.openHour.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteOpenHour(id: string) {
    await this.database.openHour.delete({
      where: {
        id,
      },
    });
  }
}
