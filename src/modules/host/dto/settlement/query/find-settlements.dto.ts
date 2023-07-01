import { Property } from 'wemacu-nestjs';

export class FindSettlementsQuery {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '일' } })
  day?: string;
}
