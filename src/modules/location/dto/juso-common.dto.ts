import { Property } from 'cumuco-nestjs';

import { Common } from '@/interface/location.interface';

export class JusoCommonDTO {
  @Property({ apiProperty: { type: 'string' } })
  errorMessage: string;

  @Property({ apiProperty: { type: 'number' } })
  countPerPage: number;

  @Property({ apiProperty: { type: 'number' } })
  totalCount: number;

  @Property({ apiProperty: { type: 'string' } })
  errorCode: string;

  @Property({ apiProperty: { type: 'number' } })
  currentPage: number;

  constructor(props: Common) {
    this.errorMessage = props.errorMessage;
    this.countPerPage = Number(props.countPerPage);
    this.totalCount = Number(props.totalCount);
    this.errorCode = props.errorCode;
    this.currentPage = Number(props.currentPage);
  }
}
