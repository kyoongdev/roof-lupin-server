import { Property } from 'wemacu-nestjs';

export class FindByDateQuery {
  @Property({ apiProperty: { type: 'string', description: '예약 가능 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 가능 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 가능 일' } })
  day: string;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 시작 시간' } })
  startAt?: number;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 종료 시간' } })
  endAt?: number;
}
