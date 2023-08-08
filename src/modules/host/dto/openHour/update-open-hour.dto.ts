import { Property } from 'cumuco-nestjs';

import { DayReqDecorator, DayResDecorator } from '@/utils/validation';

export interface UpdateOpenHourDTOProps {
  startAt: number;
  endAt: number;
  day: number;
}

export class UpdateOpenHourDTO {
  @Property({ apiProperty: { type: 'number', description: '운영 시작시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '운영 종료시간' } })
  endAt: number;

  @DayReqDecorator()
  day: number;

  constructor(props?: UpdateOpenHourDTOProps) {
    if (props) {
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.day = props.day;
    }
  }
}
