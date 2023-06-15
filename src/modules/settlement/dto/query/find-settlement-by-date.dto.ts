import { Property } from 'wemacu-nestjs';

export class FindSettlementByDateDTO {
  @Property({ apiProperty: { type: 'string', description: '연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '일' } })
  day: string;
}
