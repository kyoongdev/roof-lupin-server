import { Property } from 'cumuco-nestjs';

export interface CreateBlockedTimeDTOProps {
  year: number;
  month: number;
  day: number;
  startAt: number;
  endAt: number;
  spaceId: string;
  name: string;
}

export class CreateBlockedTimeDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

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

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 이름' } })
  name: string;

  constructor(props?: CreateBlockedTimeDTOProps) {
    if (props) {
      this.spaceId = props.spaceId;
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.name = props.name;
    }
  }
}
