import { Property } from 'wemacu-nestjs';

export interface NaverCoordinateLocationDTOProps {
  latitude: string;
  longitude: string;
  address: string | null;
}

export class NaverCoordinateLocationDTO {
  @Property({ apiProperty: { type: 'string', description: '위도' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  longitude: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주소' } })
  address: string | null;

  constructor(props: NaverCoordinateLocationDTOProps) {
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.address = props.address;
  }
}
