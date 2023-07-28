import { Property } from 'cumuco-nestjs';

import { DayReqDecorator } from '@/utils/validation';

export interface UpdateSpaceHolidayDTOProps {
  day: number;
  interval: number;
}

export class UpdateSpaceHolidayDTO {
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

  constructor(props?: UpdateSpaceHolidayDTOProps) {
    if (props) {
      this.day = props.day;
      this.interval = props.interval;
    }
  }
}
