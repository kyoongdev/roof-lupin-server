import { Property } from 'wemacu-nestjs';

export class NaverCoordinateQuery {
  @Property({ apiProperty: { type: 'string', description: '중심 위도' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', description: '중심 경도' } })
  longitude: string;
}
