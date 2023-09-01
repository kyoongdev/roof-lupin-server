import { Property } from 'cumuco-nestjs';

export class FindSpaceRentalTypeQuery {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '년도' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '일' } })
  day?: number;
}
