import { Property } from 'cumuco-nestjs';

import { CheckIsTargetDay } from '@/interface/common.interface';
import { DAY_ENUM } from '@/utils';

export interface IsHolidayDTOProps {
  isHoliday: boolean;
}

export class IsHolidayDTO {
  @Property({ apiProperty: { type: 'boolean', description: '휴무일 여부' } })
  isHoliday: boolean;

  constructor(props: IsHolidayDTOProps) {
    this.isHoliday = props.isHoliday;
  }

  getCurrentDay(targetDate: CheckIsTargetDay) {
    return this.isHoliday
      ? DAY_ENUM.HOLIDAY
      : new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day)).getDay();
  }
}
