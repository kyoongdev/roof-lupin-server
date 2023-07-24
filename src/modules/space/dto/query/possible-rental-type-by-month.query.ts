import { BadRequestException } from '@nestjs/common';

import { Property } from 'wemacu-nestjs';

import { PossibleRentalTypePagingDTO } from './possible-rental-type-paging.dto';

export interface PossibleRentalTypeByMonthQueryProps {
  year: string;
  month: string;
  day: string;
}

export class PossibleRentalTypeByMonthQuery extends PossibleRentalTypePagingDTO {
  @Property({ apiProperty: { type: 'string', description: '년도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '월' } })
  month: string;

  getPaging(): PossibleRentalTypePagingDTO {
    if (this.maxLimit < this.limit) {
      throw new BadRequestException('maxLimit은 limit보다 작아야합니다.');
    }
    return {
      limit: this.limit,
      page: this.page,
      maxLimit: this.maxLimit,
      startMonth: this.startMonth,
      startYear: this.startYear,
    };
  }
}
