import { Property } from 'cumuco-nestjs';

import { PossibleRentalTypeByMonthDTO, PossibleRentalTypeByMonthDTOProps } from './possible-rental-type-by-month.dto';

export interface PossibleRentalTypesByMonthDTOProps {
  year: string;
  month: string;
  days: PossibleRentalTypeByMonthDTOProps[];
}

export class PossibleRentalTypesByMonthDTO {
  @Property({ apiProperty: { type: 'string', description: '년도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  @Property({ apiProperty: { type: PossibleRentalTypeByMonthDTO, isArray: true, description: '일별 대여 정보' } })
  days: PossibleRentalTypeByMonthDTO[];

  constructor(props: PossibleRentalTypesByMonthDTOProps) {
    this.year = props.year;
    this.month = props.month;
    this.days = props.days.map((item) => new PossibleRentalTypeByMonthDTO(item));
  }
}
