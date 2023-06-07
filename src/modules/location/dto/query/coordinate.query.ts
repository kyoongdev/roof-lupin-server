import { Property } from 'wemacu-nestjs';

export class CoordinateQuery {
  @Property({ apiProperty: { type: 'string', description: '위도' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  longitude: string;
}
