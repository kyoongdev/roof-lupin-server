import { Property } from 'cumuco-nestjs';

import { DayResDecorator } from '@/utils/validation';

export interface SpaceHolidayDTOProps {
  id: string;
  day: number;
  interval: number;
}

export class SpaceHolidayDTO {
  @Property({ apiProperty: { type: 'string', description: '휴무일 id' } })
  id: string;

  @DayResDecorator()
  day: number;

  @Property({ apiProperty: { type: 'number', description: '간격 (해당 월의 n번째주)' } })
  interval: number;

  constructor(props: SpaceHolidayDTOProps) {
    this.id = props.id;
    this.day = props.day;
    this.interval = props.interval;
  }
}
