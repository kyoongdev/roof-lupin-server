import { Property } from 'wemacu-nestjs';

export interface PossibleRentalTypePagingDTOProps {
  page: number;
  limit: number;
  maxLimit: number;
  startYear: string;
  startMonth: string;
}

export class PossibleRentalTypePagingDTO {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  limit: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  maxLimit: number;

  @Property({ apiProperty: { type: 'string', description: '시작연도' } })
  startYear: string;

  @Property({ apiProperty: { type: 'string', description: '시작 월' } })
  startMonth: string;

  constructor(props: PossibleRentalTypePagingDTOProps) {
    this.page = props.page;
    this.limit = props.limit;
    this.maxLimit = props.maxLimit;
    this.startYear = props.startYear;
    this.startMonth = props.startMonth;
  }
}
