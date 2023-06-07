import { type NaverAddress, Property } from 'wemacu-nestjs';

import { NaverAddressElementDTO } from './address-element.dto';

export type NaverAddressDTOProps = NaverAddress;

export class NaverAddresssDTO {
  @Property({ apiProperty: { type: 'string', description: '도로명 주소' } })
  roadAddress: string;

  @Property({ apiProperty: { type: 'string', description: '지번 주소' } })
  jibunAddress: string;

  @Property({ apiProperty: { type: 'string', description: '영문 도로명 주소' } })
  englishAddress: string;

  @Property({ apiProperty: { type: 'string', description: '경도(x)' } })
  longitude: string;

  @Property({ apiProperty: { type: 'string', description: '위도(y)' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', description: '거리' } })
  distance: number;

  @Property({ apiProperty: { type: NaverAddressElementDTO, isArray: true } })
  addressElements: NaverAddressElementDTO[];

  constructor(props: NaverAddressDTOProps) {
    this.roadAddress = props.roadAddress;
    this.jibunAddress = props.jibunAddress;
    this.englishAddress = props.englishAddress;
    this.longitude = props.x;
    this.latitude = props.y;
    this.distance = props.distance;
    this.addressElements = props.addressElements.map((addressElement) => new NaverAddressElementDTO(addressElement));
  }
}
