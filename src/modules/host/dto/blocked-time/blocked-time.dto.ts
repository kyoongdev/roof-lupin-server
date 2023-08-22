import { Property } from 'cumuco-nestjs';

import { CheckIsTargetDay } from '@/interface/common.interface';

export interface BlockedTimeDTOProps {
  id: string;
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  spaceId: string;
  name: string;
  createdAt: Date;
}

export class BlockedTimeDTO {
  @Property({ apiProperty: { type: 'string', description: '차단된 시간 id' } })
  id: string;

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

  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'string', description: '차단된 시간 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'date', description: '차단된 시간 생성일' } })
  createdAt: Date;

  constructor(props: BlockedTimeDTOProps) {
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.spaceId = props.spaceId;
    this.name = props.name;
    this.createdAt = props.createdAt;
  }

  checkIsTargetDay(targetDate: CheckIsTargetDay) {
    return targetDate.year === this.year && targetDate.month === this.month && targetDate.day === this.day;
  }
}
