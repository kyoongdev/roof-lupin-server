import { Module } from '@nestjs/common';

import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';

@Module({
  providers: [HolidayService],
  controllers: [HolidayController],
})
export class HolidayModule {}
