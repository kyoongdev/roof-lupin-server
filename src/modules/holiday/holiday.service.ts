import { Injectable } from '@nestjs/common';

import { range } from 'lodash';

import { PrismaService } from '@/database/prisma.service';

import { HolidayDTO, HolidayPagingQuery, IsHolidayDTO } from './dto';
import { PaginationHolidayDTO } from './dto/pagination-holiday.dto';
import { PagingHolidayDTO } from './dto/paging-holiday.dto';

@Injectable()
export class HolidayService {
  constructor(private readonly database: PrismaService) {}

  async findHoliday(year: number, month: number) {
    const holidays = await this.database.holiday.findMany({
      where: {
        year: year,
        month: month,
      },
    });

    return holidays.map((holiday) => new HolidayDTO(holiday));
  }

  async findPagingHoliday(paging: HolidayPagingQuery) {
    const data = await Promise.all(
      range(
        paging.page + Number(paging.startMonth) - 1,
        paging.page + Number(paging.startMonth) + paging.limit - 1
      ).map(async (month, index) => {
        const currentYear =
          month / 12 > 1 ? Number(paging.startYear) + Math.floor(month / 12) : Number(paging.startYear);
        const currentMonth = month % 12 === 0 ? 12 : month % 12;

        const holidays = await this.database.holiday.findMany({
          where: {
            year: currentYear,
            month: currentMonth,
          },
        });

        return new PagingHolidayDTO({
          year: currentYear,
          month: currentMonth,
          holidays: holidays.map((holiday) => new HolidayDTO(holiday)),
        });
      })
    );

    return new PaginationHolidayDTO({
      paging,
      data,
    });
  }

  async checkIsHoliday(year: number, month: number, day: number) {
    const holiday = await this.database.holiday.findFirst({
      where: {
        year: year,
        month: month,
        day: day,
      },
    });

    return new IsHolidayDTO({
      isHoliday: Boolean(holiday),
    });
  }
}
