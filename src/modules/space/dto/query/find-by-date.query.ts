import { Property } from 'cumuco-nestjs';

export class FindByDateQuery {
  @Property({ apiProperty: { type: 'number', description: '예약 가능 연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 일' } })
  day: number;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 시작 시간' } })
  startAt?: number;

  @Property({ apiProperty: { type: 'number', description: '예약 가능 종료 시간' } })
  endAt?: number;
}
