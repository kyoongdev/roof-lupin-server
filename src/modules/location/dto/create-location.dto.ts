import { Property } from 'cumuco-nestjs';

export interface CreateLocationDTOProps {
  lat: string;
  lng: string;
  detailAddress: string;
  roadAddress: string;
  jibunAddress: string;
}

export class CreateLocationDTO {
  @Property({ apiProperty: { type: 'string', description: '위도' } })
  lat: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  lng: string;

  @Property({ apiProperty: { type: 'string', description: '도로명 주소' } })
  roadAddress: string;

  @Property({ apiProperty: { type: 'string', description: '지번 주소' } })
  jibunAddress: string;

  @Property({ apiProperty: { type: 'string', description: '상세주소' } })
  detailAddress: string;

  constructor(props?: CreateLocationDTOProps) {
    if (props) {
      this.lat = props.lat;
      this.lng = props.lng;
      this.roadAddress = props.roadAddress;
      this.jibunAddress = props.jibunAddress;
      this.detailAddress = props.detailAddress;
    }
  }
}
