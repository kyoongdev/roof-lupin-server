import { Prisma } from '@prisma/client';
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

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최소 평수' } })
  minSize?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최대 평수' } })
  maxSize?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '서비스 id들 (,를 통해 구분합니다.)' } })
  serviceIds?: string;

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

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 연도' } })
  year?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 월' } })
  month?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 가능 일' } })
  day?: string;

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
      startAt: this.startAt,
      endAt: this.endAt,
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

  generateSqlWhereClause(excludeQueries: Prisma.Sql[], userId?: string) {
    const userCountWhere = this.userCount ? Prisma.sql`AND minUser <= ${this.userCount}` : Prisma.empty;
    const sizeWhere =
      this.minSize && this.maxSize
        ? Prisma.sql`AND (minSize >= ${this.minSize} AND minSize <= ${this.maxSize})`
        : Prisma.empty;
    const serviceWhere = this.serviceIds
      ? Prisma.sql`AND ss.id IN (${Prisma.join(this.serviceIds.split(','), ',')})`
      : Prisma.empty;
    const immediateReservationWhere =
      typeof this.isImmediateReservation === 'boolean'
        ? Prisma.sql`AND sp.isImmediateReservation = ${this.isImmediateReservation ? 1 : 0}`
        : Prisma.empty;
    const locationWhere = this.locationName
      ? Prisma.sql`AND (sl.jibunAddress LIKE '%${Prisma.raw(this.locationName)}%' OR sl.roadAddress LIKE '%${Prisma.raw(
          this.locationName
        )}%')`
      : Prisma.empty;
    const reportWhere = userId
      ? Prisma.sql`AND sp.id NOT IN (SELECT spaceId FROM SpaceReport as sre WHERE sre.userId = ${userId})`
      : Prisma.empty;
    const categoryWhere = this.category ? Prisma.sql`AND ca.name LIKE '%${Prisma.raw(this.category)}%'` : Prisma.empty;
    const categoryIdWhere = this.categoryIds
      ? Prisma.sql`AND ca.id IN (${Prisma.join(this.categoryIds.split(','), ',')})`
      : Prisma.empty;
    const keywordWhere = this.keyword
      ? Prisma.sql`
          AND (sp.title LIKE '%${Prisma.raw(this.keyword)}%'
          OR sl.jibunAddress LIKE '%${Prisma.raw(this.keyword)}%'
          OR sl.roadAddress LIKE '%${Prisma.raw(this.keyword)}%'
          OR pt.name LIKE '%${Prisma.raw(this.keyword)}%'
          OR ht.name LIKE '%${Prisma.raw(this.keyword)}%')`
      : Prisma.empty;

    const excludeIds =
      excludeQueries.length > 0
        ? Prisma.sql`${Prisma.join(
            excludeQueries.map((query) => Prisma.sql`AND sp.id NOT in (${query})`),
            ''
          )}`
        : Prisma.empty;

    return Prisma.sql`WHERE sp.isPublic = 1 AND sp.isApproved = 1 ${userCountWhere} ${sizeWhere} ${immediateReservationWhere} ${serviceWhere} ${categoryWhere} ${categoryIdWhere} ${locationWhere} ${excludeIds} ${reportWhere} ${keywordWhere} `;
  }
}
