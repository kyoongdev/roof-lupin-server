import { Property } from 'wemacu-nestjs';

export interface UpdateBlockedTimeDTOProps {
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
}

export class UpdateBlockedTimeDTO {
  @Property({ apiProperty: { type: 'string', description: '차단된 시간 연' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 시작시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '차단된 시간 끝나는 시간' } })
  endAt: number;

  constructor(props?: UpdateBlockedTimeDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
    }
  }
}
