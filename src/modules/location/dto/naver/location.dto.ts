import { NaverGeocodeResponse, Property } from 'wemacu-nestjs';

import { NaverAddresssDTO } from './address.dto';
import { NaverMetaDTO } from './meta.dto';

export class NaverLocationDTO {
  @Property({ apiProperty: { type: 'string', description: '상태' } })
  status: string;

  @Property({ apiProperty: { type: NaverMetaDTO, description: '메타 데이터' } })
  meta: NaverMetaDTO;

  @Property({ apiProperty: { type: NaverAddresssDTO, isArray: true, description: '주소 데이터' } })
  addresses: NaverAddresssDTO[];

  constructor(props: NaverGeocodeResponse) {
    this.status = props.status;
    this.meta = new NaverMetaDTO(props.meta);
    this.addresses = props.addresses.map((address) => new NaverAddresssDTO(address));
  }
}
