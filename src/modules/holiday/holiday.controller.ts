import { Get, Query } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { FindHolidayDTO, HolidayDTO, HolidayPagingQuery } from './dto';
import { HolidayService } from './holiday.service';

@ApiController('holidays', '휴일')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get('')
  @RequestApi({
    summary: {
      description: '휴일 조회하기',
      summary: '휴일 조회하기',
    },
  })
  @ResponseApi({
    type: HolidayDTO,
    isArray: true,
  })
  async getHolidays(@Query() query: FindHolidayDTO) {
    return await this.holidayService.findHoliday(query.year, query.month);
  }

  @Get('paging')
  @RequestApi({
    summary: {
      description: '휴일 조회하기',
      summary: '휴일 조회하기',
    },
  })
  @ResponseApi({
    type: HolidayDTO,
    isArray: true,
  })
  async getPagingHolidays(@Query() query: HolidayPagingQuery) {
    return await this.holidayService.findPagingHoliday(query);
  }
}
