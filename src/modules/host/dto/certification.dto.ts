import { Property } from 'cumuco-nestjs';

import { Certification } from '@/interface/payment/port-one.interface';

export type CertificationDTOProps = Certification;

export class CertificationDTO {
  @Property({ apiProperty: { type: 'string' } })
  imp_uid: string;

  @Property({ apiProperty: { type: 'string' } })
  merchant_uid: string;

  @Property({ apiProperty: { type: 'string' } })
  pg_tid: string;

  @Property({ apiProperty: { type: 'string' } })
  pg_provider: string;

  @Property({ apiProperty: { type: 'string' } })
  name: string;

  @Property({ apiProperty: { type: 'string' } })
  gender: string;

  @Property({ apiProperty: { type: 'string' } })
  birthday: string;

  @Property({ apiProperty: { type: 'boolean' } })
  foreigner: boolean;

  @Property({ apiProperty: { type: 'string' } })
  phone: string;

  @Property({ apiProperty: { type: 'string' } })
  carrier: string;

  @Property({ apiProperty: { type: 'boolean' } })
  certified: boolean;

  @Property({ apiProperty: { type: 'number' } })
  certified_at: number;

  @Property({ apiProperty: { type: 'string' } })
  unique_key: string;

  @Property({ apiProperty: { type: 'string' } })
  unique_in_site: string;

  @Property({ apiProperty: { type: 'string' } })
  origin: string;

  @Property({ apiProperty: { type: 'boolean' } })
  foreigner_v2: boolean;
  constructor(props: CertificationDTOProps) {
    Object.assign(this, props);
  }
}
