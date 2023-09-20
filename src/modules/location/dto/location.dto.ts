import { Property } from 'cumuco-nestjs';

export interface LocationDTOProps {
  id: string;
  lat: string; //위도
  lng: string; // 경도
  detailAddress: string;
  roadAddress: string;
  jibunAddress: string;
}

export class LocationDTO {
  @Property({ apiProperty: { type: 'string', description: '위치 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '위도' } })
  lat: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  lng: string;

  @Property({ apiProperty: { type: 'string', description: '도로명 주소' } })
  roadAddress: string;

  @Property({ apiProperty: { type: 'string', description: '지번 주소' } })
  jibunAddress: string;

  @Property({ apiProperty: { type: 'string', description: '상세 주소' } })
  detailAddress: string;

  constructor(props: LocationDTOProps) {
    this.id = props.id;
    this.lat = props.lat;
    this.lng = props.lng;
    this.roadAddress = props.roadAddress;
    this.jibunAddress = props.jibunAddress;
    this.detailAddress = props.detailAddress;
  }
}
