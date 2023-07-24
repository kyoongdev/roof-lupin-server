import { Property } from 'wemacu-nestjs';

import { PossibleRentalTypePagingDTOProps } from '../query/possible-rental-type-paging.dto';

export class PossibleRentalTypePaginationDTO {
  @Property({ apiProperty: { type: 'number' } })
  page: number;

  @Property({ apiProperty: { type: 'number' } })
  limit: number;

  @Property({ apiProperty: { type: 'boolean' } })
  hasPrev: boolean;

  @Property({ apiProperty: { type: 'boolean' } })
  hasNext: boolean;

  constructor(props: PossibleRentalTypePagingDTOProps) {
    this.page = isNaN(Number(props.page)) ? 1 : Number(props.page);
    this.limit = isNaN(Number(props.limit)) ? 10 : Number(props.limit);

    this.hasPrev = this.page > 1;
    this.hasNext = this.limit < props.maxLimit;
  }
}
