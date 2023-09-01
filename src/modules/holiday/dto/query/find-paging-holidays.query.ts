import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';

export interface HolidayPagingQueryProps {
  page: number;
  limit: number;
  maxSize: number;
  startYear: number;
  startMonth: number;
}

export class HolidayPagingQuery {
  @Property({ apiProperty: { type: 'number', minimum: 1, default: 1 } })
  page: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  limit: number;

  @Property({ apiProperty: { type: 'number', minimum: 1, default: 20 } })
  maxSize: number;

  @Property({ apiProperty: { type: 'number', description: '시작연도' } })
  startYear: number;

  @Property({ apiProperty: { type: 'number', description: '시작 월' } })
  startMonth: number;

  constructor(props?: HolidayPagingQueryProps) {
    if (props) {
      this.page = props.page;
      this.limit = props.limit;
      this.maxSize = props.maxSize;
      this.startYear = props.startYear;
      this.startMonth = props.startMonth;
    }
  }
}
