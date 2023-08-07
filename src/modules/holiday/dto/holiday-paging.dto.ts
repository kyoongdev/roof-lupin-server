import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';

import { HolidayPagingQueryProps } from './query';

export class HolidayPagingDTO {
  @Property({ apiProperty: { type: 'number' } })
  page: number;

  @Property({ apiProperty: { type: 'number' } })
  limit: number;

  @Property({ apiProperty: { type: 'number' } })
  maxSize: number;

  @Property({ apiProperty: { type: 'boolean' } })
  hasPrev: boolean;

  @Property({ apiProperty: { type: 'boolean' } })
  hasNext: boolean;

  constructor(props: HolidayPagingQueryProps) {
    this.page = isNaN(Number(props.page)) ? 1 : Number(props.page);
    this.limit = isNaN(Number(props.limit)) ? 10 : Number(props.limit);
    this.maxSize = props.maxSize;
    this.hasPrev = this.page > 1;
    this.hasNext = this.page * this.limit < this.maxSize;
  }
}
