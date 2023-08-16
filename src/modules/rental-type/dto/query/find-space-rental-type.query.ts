import { Property } from 'cumuco-nestjs';

export class FindSpaceRentalTypeQuery {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '년도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '일' } })
  day?: string;
}
