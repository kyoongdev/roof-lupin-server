import { Property } from 'cumuco-nestjs';

import { DayReqDecorator, DayResDecorator } from '@/utils/validation';

export interface UpdateOpenHourDTOProps {
  startAt: string;
  endAt: string;
  day: number;
}

export class UpdateOpenHourDTO {
  @Property({ apiProperty: { type: 'string', description: '운영 시작시간' } })
  startAt: string;

  @Property({ apiProperty: { type: 'string', description: '운영 종료시간' } })
  endAt: string;

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
