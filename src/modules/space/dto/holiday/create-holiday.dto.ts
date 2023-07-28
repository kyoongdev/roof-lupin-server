import { Property } from 'cumuco-nestjs';

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
      maximum: 5,
      description: '간격 (해당 월의 n번째주)',
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
