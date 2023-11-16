import { Property } from 'cumuco-nestjs';

export interface BaseCreateBlockedTimeDTOProps {
  year: number;
  month: number;
  day: number;
  startAt: number;
  endAt: number;
}

export class BaseCreateBlockedTimeDTO {
  @Property({ apiProperty: { type: 'number', description: '차단된 시간 연' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 일' } })
  day: number;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 시작시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 끝나는 시간' } })
  endAt: number;

  constructor(props: BaseCreateBlockedTimeDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
    }
  }
}
