import { Property } from 'cumuco-nestjs';

import { Common } from '@/interface/location.interface';

export class JusoCommonDTO {
  @Property({ apiProperty: { type: 'string' } })
  errorMessage: string;

  @Property({ apiProperty: { type: 'string' } })
  countPerPage: string;

  @Property({ apiProperty: { type: 'string' } })
  totalCount: string;

  @Property({ apiProperty: { type: 'string' } })
  errorCode: string;

  @Property({ apiProperty: { type: 'string' } })
  currentPage: string;

  constructor(props: Common) {
    Object.assign(this, props);
  }
}
