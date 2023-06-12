import { PagingDTO, Property } from 'wemacu-nestjs';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '인원수 필터' } })
  userCount?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 명' } })
  category?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '위도' } })
  lat?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '경도' } })
  lng?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '거리 - 위도 경도 검색시 필수' } })
  distance?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '지역명', example: '강동구' } })
  locationName?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 일' } })
  day?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 시간' } })
  time?: number;
}
