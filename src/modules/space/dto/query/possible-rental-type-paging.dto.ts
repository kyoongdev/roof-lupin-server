import { BadRequestException } from '@nestjs/common';

import { Property } from 'wemacu-nestjs';

export interface PossibleRentalTypePagingDTOProps {
  page: number;
  limit: number;
  maxSize: number;
  startYear: string;
  startMonth: string;
}

export class PossibleRentalTypePagingDTO {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  limit: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  maxSize: number;

  @Property({ apiProperty: { type: 'string', description: '시작연도' } })
  startYear: string;

  @Property({ apiProperty: { type: 'string', description: '시작 월' } })
  startMonth: string;

  constructor(props?: PossibleRentalTypePagingDTOProps) {
    if (props) {
      this.page = props.page;
      this.limit = props.limit;
      this.maxSize = props.maxSize;
      this.startYear = props.startYear;
      this.startMonth = props.startMonth;
    }
  }
}
