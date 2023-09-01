import { Property } from 'cumuco-nestjs';

import { PossibleRentalTypeByMonthDTO, PossibleRentalTypeByMonthDTOProps } from './possible-rental-type-by-month.dto';

export interface PossibleRentalTypesByMonthDTOProps {
  year: number;
  month: number;
  days: PossibleRentalTypeByMonthDTOProps[];
}

export class PossibleRentalTypesByMonthDTO {
  @Property({ apiProperty: { type: 'number', description: '년도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '월' } })
  month: number;

  @Property({ apiProperty: { type: PossibleRentalTypeByMonthDTO, isArray: true, description: '일별 대여 정보' } })
  days: PossibleRentalTypeByMonthDTO[];

  constructor(props: PossibleRentalTypesByMonthDTOProps) {
    this.year = props.year;
    this.month = props.month;
    this.days = props.days.map((item) => new PossibleRentalTypeByMonthDTO(item));
  }
}
