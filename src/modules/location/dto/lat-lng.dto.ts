import { Property } from 'cumuco-nestjs';

export class LatLngDTO {
  @Property({ apiProperty: { type: 'string', description: '위도' } })
  lat: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  lng: string;

  @Property({ apiProperty: { type: 'number', description: '거리' } })
  distance: number;
}
