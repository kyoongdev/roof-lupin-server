import { Property } from 'cumuco-nestjs';

export class FindByLocationQuery {
  @Property({ apiProperty: { type: 'string', description: '위도' } })
  lat: string;

  @Property({ apiProperty: { type: 'string', description: '경도' } })
  lng: string;

  @Property({ apiProperty: { type: 'number', description: '거리 - 위도 경도 검색시 필수' } })
  distance: number;
}
