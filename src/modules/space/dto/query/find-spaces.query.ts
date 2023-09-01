import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

import { SPACE_SORT_OPTION, SPACE_SORT_OPTION_VALUES, SpaceSortValidation } from '../validation/space-sort.validation';

import { FindByDateQuery } from './find-by-date.query';
import { FindByLocationQuery } from './find-by-location.query';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '검색어' } })
  keyword?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '인원수 필터' } })
  userCount?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 명' } })
  category?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 id들 (,를 통해 구분합니다.)' } })
  categoryIds?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '서비스 id들 (,를 통해 구분합니다.)' } })
  serviceIds?: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '위치필터 토픽 id들 (,를 통해 구분합니다.)' },
  })
  locationFilterTopicIds?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '결제 유형' } })
  isImmediateReservation?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '위도' } })
  lat?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '경도' } })
  lng?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '거리 - 위도 경도 검색시 필수' } })
  distance?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '지역명', example: '강동구' } })
  locationName?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 연도' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 일' } })
  day?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 시작 시간' } })
  startAt?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 가능 종료 시간' } })
  endAt?: number;

  @SpaceSortValidation()
  @Property({ apiProperty: { type: 'string', nullable: true, enum: SPACE_SORT_OPTION_VALUES } })
  sort?: keyof typeof SPACE_SORT_OPTION;

  getFindByDateQuery(): FindByDateQuery {
    if (!this.year || !this.month || !this.day) {
      return null;
    }

    return {
      year: this.year,
      month: this.month,
      day: this.day,
      startAt: this.startAt ?? undefined,
      endAt: this.endAt ? (this.endAt < this.startAt ? this.endAt + 24 : this.endAt) : undefined,
    };
  }

  getFindByLocationQuery(): FindByLocationQuery | null {
    if (!this.lat || !this.lng || !this.distance) {
      return null;
    }

    return {
      lat: this.lat,
      lng: this.lng,
      distance: this.distance,
    };
  }
}
