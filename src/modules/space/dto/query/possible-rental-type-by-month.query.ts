import { Property } from 'cumuco-nestjs';

export interface PossibleRentalTypeByMonthQueryProps {
  year: number;
  month: number;
  day: number;
}

export class PossibleRentalTypeByMonthQuery {
  @Property({ apiProperty: { type: 'number', description: '년도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '월' } })
  month: number;
}
