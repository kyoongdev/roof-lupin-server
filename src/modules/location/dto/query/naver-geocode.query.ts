import { Property } from 'cumuco-nestjs';

export class NaverGeocodeQuery {
  @Property({ apiProperty: { type: 'string', description: '주소' } })
  query: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '중심 위도' } })
  latitude: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '중심 경도' } })
  longitude: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '결과 필터링' } })
  filter?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '언어' } })
  language?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '페이지' } })
  page?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '페이지 당 개수' } })
  count?: number;
}
