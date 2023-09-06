import { Property } from 'cumuco-nestjs';

export class KakaoLocationDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '장소명' } })
  place_name: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  category_name: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 코드' } })
  category_group_code: string;

  @Property({ apiProperty: { type: 'string', description: '카테고르 그룹 이름' } })
  category_group_name: string;

  @Property({ apiProperty: { type: 'string', description: '전화번호' } })
  phone: string;

  @Property({ apiProperty: { type: 'string', description: '전체 지번 주소' } })
  address_name: string;

  @Property({ apiProperty: { type: 'string', description: '전체 도로명 주소' } })
  road_address_name: string;

  @Property({ apiProperty: { type: 'string', description: '장소 상세페이지 URL' } })
  place_url: string;

  @Property({ apiProperty: { type: 'string', description: '거리' } })
  distance?: string;

  @Property({ apiProperty: { type: 'string', description: '경도 longitude' } })
  x: string;

  @Property({ apiProperty: { type: 'string', description: '위도 latitude' } })
  y: string;
}
