import { Property } from 'cumuco-nestjs';

export interface PossibleRentalTypeQueryProps {
  year: string;
  month: string;
  day: string;
}

export class PossibleRentalTypeQuery {
  @Property({ apiProperty: { type: 'string', description: '년도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '일' } })
  day: string;
}
