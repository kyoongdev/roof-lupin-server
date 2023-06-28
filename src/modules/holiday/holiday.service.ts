import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

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

    return holidays;
  }
}
