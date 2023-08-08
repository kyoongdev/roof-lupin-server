import { Property } from 'cumuco-nestjs';

import { DayResDecorator } from '@/utils/validation';

export interface OpenHourDTOProps {
  id: string;
  startAt: number;
  endAt: number;
  day: number;
}

export class OpenHourDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '운영 시작시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '운영 종료시간' } })
  endAt: number;

  @DayResDecorator()
  day: number;

  constructor(props: OpenHourDTOProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.day = props.day;
  }
}
