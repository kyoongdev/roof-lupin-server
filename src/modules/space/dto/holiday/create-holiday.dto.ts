import { Property } from 'wemacu-nestjs';

import { DayReqDecorator, DayResDecorator } from '@/utils/validation';

export interface CreateSpaceHolidayDTOProps {
  day: number;
  interval: number;
}

export class CreateSpaceHolidayDTO {
  @DayReqDecorator()
  day: number;

  @Property({
    apiProperty: {
      type: 'number',
      minimum: 1,
      maximum: 4,
      description: '간격 (1 ~ 3 은 해당 월의 n번째주, 4는 월 단위)',
    },
  })
  interval: number;

  constructor(props?: CreateSpaceHolidayDTOProps) {
    if (props) {
      this.day = props.day;
      this.interval = props.interval;
    }
  }
}
