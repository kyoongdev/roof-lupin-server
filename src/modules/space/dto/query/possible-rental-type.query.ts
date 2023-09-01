import { Property } from 'cumuco-nestjs';

export interface PossibleRentalTypeQueryProps {
  year: number;
  month: number;
  day: number;
}

export class PossibleRentalTypeQuery {
  @Property({ apiProperty: { type: 'number', description: '년도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '일' } })
  day: number;
}
