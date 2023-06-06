import { Property } from 'wemacu-nestjs';

export interface UpdateLocationDTOProps {
  lat?: string;
  lng?: string;
  roadAddress?: string;
  jibunAddress?: string;
}

export class UpdateLocationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '위도' } })
  lat?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '경도' } })
  lng?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '도로명 주소' } })
  roadAddress?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '지번 주소' } })
  jibunAddress?: string;

  constructor(props?: UpdateLocationDTOProps) {
    if (props) {
      this.lat = props.lat;
      this.lng = props.lng;
      this.roadAddress = props.roadAddress;
      this.jibunAddress = props.jibunAddress;
    }
  }
}
