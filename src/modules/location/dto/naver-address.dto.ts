import { type NaverAddress, Property } from 'wemacu-nestjs';

export type NaverAddressDTOProps = NaverAddress;

//X : LONGITUDE
//Y : LATITUDE

export class NaverAddresssDTO {
  @Property({ apiProperty: { type: 'string', description: '도로명 주소' } })
  roadAddress: string;

  @Property({ apiProperty: { type: 'string', description: '지번 주소' } })
  jibunAddress: string;

  @Property({ apiProperty: { type: 'string', description: '영문 도로명 주소' } })
  englishAddress: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  longitude: string;

  @Property({ apiProperty: { type: 'string', description: '위도' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', description: '거리' } })
  distance: number;
}
