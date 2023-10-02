import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CreateSpaceHolidayDTO, SpaceHolidayDTO, UpdateSpaceHolidayDTO } from '@/modules/space/dto/holiday';

import { HOST_ERROR_CODE } from '../exception/errorCode';
import { HostException } from '../exception/host.exception';

@Injectable()
export class HostSpaceHolidayRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpaceHoliday(id: string) {
    const holiday = await this.database.spaceHoliday.findUnique({
      where: {
        id,
      },
    });

    if (!holiday) {
      throw new HostException(HOST_ERROR_CODE.HOST_SPACE_HOLIDAY_NOT_FOUND);
    }

    return new SpaceHolidayDTO(holiday);
  }

  async countSpaceHolidays(args = {} as Prisma.SpaceHolidayCountArgs) {
    return await this.database.spaceHoliday.count(args);
  }

  async findSpaceHolidays(args = {} as Prisma.SpaceHolidayFindManyArgs) {
    const holidays = await this.database.spaceHoliday.findMany(args);

    return holidays.map((holiday) => new SpaceHolidayDTO(holiday));
  }

  async findSpaceHolidayBySpaceId(spaceId: string) {
    const holiday = await this.database.spaceHoliday.findFirst({
      where: {
        spaceId,
      },
    });

    return holiday ? new SpaceHolidayDTO(holiday) : undefined;
  }

  async createSpaceHoliday(spaceId: string, data: CreateSpaceHolidayDTO) {
    const holiday = await this.database.spaceHoliday.create({
      data: {
        space: {
          connect: {
            id: spaceId,
          },
        },
        ...data,
      },
    });

    return holiday.id;
  }

  async updateSpaceHoliday(id: string, data: UpdateSpaceHolidayDTO) {
    await this.database.spaceHoliday.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteSpaceHoliday(id: string) {
    await this.database.spaceHoliday.delete({
      where: {
        id,
      },
    });
  }
}
