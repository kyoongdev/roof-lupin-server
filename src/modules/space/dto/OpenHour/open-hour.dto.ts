import { Property } from 'wemacu-nestjs';

import { DayResDecorator } from '@/utils/validation';

export interface OpenHourDTOProps {
  id: string;
  startAt: string;
  endAt: string;
  day: number;
}

export class OpenHourDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '운영 시작시간' } })
  startAt: string;

  @Property({ apiProperty: { type: 'string', description: '운영 종료시간' } })
  endAt: string;

  @DayResDecorator()
  day: number;

  constructor(props: OpenHourDTOProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.day = props.day;
  }
}
