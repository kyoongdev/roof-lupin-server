import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { HolidayDTO } from './dto';

@Injectable()
export class HolidayService {
  constructor(private readonly database: PrismaService) {}

  async findHoliday(year: string, month: string) {
    const holidays = await this.database.holiday.findMany({
      where: {
        year: year,
        month: month,
      },
    });

    return holidays.map((holiday) => new HolidayDTO(holiday));
  }

  async checkIsHoliday(year: string, month: string, day: string) {
    const holiday = await this.database.holiday.findFirst({
      where: {
        year: year,
        month: month,
        day: day,
      },
    });

    return !!holiday;
  }
}
