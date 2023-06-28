import { Property } from 'wemacu-nestjs';

export interface PossibleRentalTypeByMonthQueryProps {
  year: string;
  month: string;
  day: string;
}

export class PossibleRentalTypeByMonthQuery {
  @Property({ apiProperty: { type: 'string', description: '년도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;
}
