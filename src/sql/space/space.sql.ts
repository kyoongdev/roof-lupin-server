import { Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';
import { range } from 'lodash';

import { getWeek } from '@/common/date';
import { FindSpacesQuery } from '@/modules/space/dto/query';
import { SPACE_ERROR_CODE } from '@/modules/space/exception/errorCode';
import { SpaceException } from '@/modules/space/exception/space.exception';
import { getDay } from '@/utils';

import type { BaseSQLInterface } from '../base-sql.interface';

import { BaseSpaceSQL, type BaseSpaceSQLProps } from './base-space.sql';

interface SpaceSQLProps extends BaseSpaceSQLProps {
  query: FindSpacesQuery;
}

export class SpaceSQL extends BaseSpaceSQL implements BaseSQLInterface {
  query: FindSpacesQuery;
  private type: 'BASE' | 'DISTANCE' | 'POPULARITY' = 'BASE';

  constructor(props: SpaceSQLProps) {
    super(props);
    this.query = props.query;
    this.setType();
  }

  getSQLQuery(): Sql {
    if (this.type === 'DISTANCE') {
      const location = this.query.getFindByLocationQuery();
      return Prisma.sql`
      SELECT ${this.getBaseSelect()}, (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
        -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) as distance
      FROM Space sp
      ${this.getBaseJoin()}
      ${this.getWhere()} AND  (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
      -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat)))) <= ${location.distance / 1000}
      GROUP BY sp.id
      ORDER BY sp.orderNo, distance 
      LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
    } else if (this.type === 'POPULARITY') {
      return Prisma.sql`
                SELECT ${this.getBaseSelect()}
                FROM Space sp
                ${this.getBaseJoin()}
                ${this.getWhere()}
                GROUP BY sp.id
                ORDER BY sp.orderNo DESC, interestCount DESC, averageScore DESC, reviewCount DESC
                LIMIT ${this.paging.page},${this.paging.limit ?? 10}
            `;
    }

    const orderBy =
      this.query.sort === 'PRICE_HIGH'
        ? Prisma.sql`baseCost DESC`
        : this.query.sort === 'PRICE_LOW'
        ? Prisma.sql`baseCost ASC`
        : Prisma.sql`sp.createdAt DESC`;

    return Prisma.sql`
          SELECT ${this.getBaseSelect()}
          FROM Space sp
          ${this.getBaseJoin()}
          ${this.getWhere()}
          GROUP BY sp.id
          ORDER BY sp.orderNo, ${orderBy}
          LIMIT ${this.paging.page},${this.paging.limit ?? 10}
          `;
  }

  getWhere() {
    const { excludeQueries, includeQueries } = this.getExcludeSpaces();

    const locationFilterWhere = this.query.locationFilterTopicIds
      ? Prisma.sql`
      AND (${Prisma.join(
        this.query.locationFilterTopicIds.split(',').map((topicId) => {
          return Prisma.sql`
              EXISTS (
                SELECT lft.id
                FROM LocationFilterTopic lft
                WHERE lft.id = ${topicId} AND (sl.jibunAddress LIKE CONCAT('%', lft.name, '%') OR sl.roadAddress LIKE CONCAT('%', lft.name, '%'))
                ) 
          `;
        }),
        ` OR `
      )})`
      : Prisma.empty;

    const userCountWhere = this.query.userCount ? Prisma.sql`AND maxUser >= ${this.query.userCount}` : Prisma.empty;

    const serviceWhere = this.query.serviceIds
      ? Prisma.sql`AND (${Prisma.join(
          this.query.serviceIds.split(',').map(
            (serviceId) => Prisma.sql`
              EXISTS (
                SELECT *
                FROM SpaceService as iss
                WHERE iss.spaceId = sp.id AND iss.serviceId = ${serviceId}
              )`
          ),
          ' OR '
        )})`
      : Prisma.empty;

    const immediateReservationWhere =
      typeof this.query.isImmediateReservation === 'boolean'
        ? Prisma.sql`AND sp.isImmediateReservation = ${this.query.isImmediateReservation ? 1 : 0}`
        : Prisma.empty;

    const locationWhere = this.query.locationName
      ? Prisma.sql`AND (sl.jibunAddress LIKE '%${Prisma.raw(
          this.query.locationName
        )}%' OR sl.roadAddress LIKE '%${Prisma.raw(this.query.locationName)}%')`
      : Prisma.empty;

    const reportWhere = this.userId
      ? Prisma.sql`AND NOT EXISTS (SELECT spaceId FROM UserReport re WHERE re.userId = ${this.userId} AND re.spaceId = sp.id)`
      : Prisma.empty;

    const categoryWhere = this.query.category
      ? Prisma.sql`AND ca.name LIKE '%${Prisma.raw(this.query.category)}%'`
      : Prisma.empty;

    const categoryIdWhere = this.query.categoryIds
      ? Prisma.sql`AND ca.id IN (${Prisma.join(this.query.categoryIds.split(','), ',')})`
      : Prisma.empty;

    const keywordWhere = this.query.keyword
      ? Prisma.sql`
          AND (sp.title LIKE '%${Prisma.raw(this.query.keyword)}%'
          OR sl.jibunAddress LIKE '%${Prisma.raw(this.query.keyword)}%'
          OR sl.roadAddress LIKE '%${Prisma.raw(this.query.keyword)}%'
          OR pt.name LIKE '%${Prisma.raw(this.query.keyword)}%'
          OR ht.name LIKE '%${Prisma.raw(this.query.keyword)}%')`
      : Prisma.empty;

    const excludeIds =
      excludeQueries.length > 0
        ? Prisma.sql`${Prisma.join(
            excludeQueries.map((query) => Prisma.sql`AND NOT EXISTS (${query})`),
            ''
          )}`
        : Prisma.empty;

    const includeIds =
      includeQueries.length > 0
        ? Prisma.sql`${Prisma.join(
            includeQueries.map((query) => Prisma.sql`AND EXISTS (${query})`),
            ''
          )}`
        : Prisma.empty;

    return Prisma.sql`WHERE sp.isPublic = 1 AND sp.isApproved = 1 AND sp.deletedAt IS NULL AND sr.deletedAt IS NULL
                      ${locationFilterWhere}
                      ${userCountWhere} 
                      ${immediateReservationWhere} 
                      ${serviceWhere} 
                      ${categoryWhere} 
                      ${categoryIdWhere} 
                      ${locationWhere} 
                      ${excludeIds} 
                      ${includeIds}
                      ${reportWhere} 
                      ${keywordWhere} 
                      `;
  }

  getExcludeSpaces() {
    const date = this.query.getFindByDateQuery();
    const excludeQueries: Prisma.Sql[] = [];
    const includeQueries: Prisma.Sql[] = [];

    if (date) {
      const timeQuery =
        date?.startAt && date?.endAt
          ? Prisma.sql`AND (      
            ${Prisma.join(
              range(date.startAt, (date.endAt < date.startAt ? date.endAt + 24 : date.endAt) + 1).map((value) => {
                return Prisma.sql`(ReservationRentalType.startAt <= ${value} AND ${value} <= ReservationRentalType.endAt)`;
              }),
              ` AND `
            )}
          ) `
          : Prisma.sql`AND (      
            ${Prisma.join(
              range(9, 33).map((value) => {
                return Prisma.sql`(ReservationRentalType.startAt <= ${value} AND ${value} <= ReservationRentalType.endAt)`;
              }),
              ` AND `
            )}
          ) `;

      const week = getWeek(new Date(Number(date.year), Number(date.month) - 1, Number(date.day)));
      const day = getDay(Number(date.year), Number(date.month), Number(date.day), this.isHoliday);

      const dateQuery = date
        ? Prisma.sql`(NOT EXISTS (SELECT rc.id FROM ReservationCancel rc WHERE Reservation.id = rc.reservationId) AND Reservation.deletedAt IS NULL AND Reservation.payedAt IS NOT NULL AND Reservation.year = ${date.year} AND Reservation.month = ${date.month} AND Reservation.day = ${date.day})${timeQuery}`
        : Prisma.empty;

      const query = Prisma.sql`
        SELECT isp.id
        FROM Reservation
        LEFT JOIN ReservationRentalType ON Reservation.id = ReservationRentalType.reservationId
        LEFT JOIN RentalType ON ReservationRentalType.rentalTypeId = RentalType.id
        LEFT JOIN Space isp ON RentalType.spaceId = isp.id
        LEFT JOIN SpaceHoliday sh ON isp.id = sh.spaceId
        LEFT JOIN OpenHour oh ON isp.id = oh.spaceId
        WHERE  ${dateQuery}  AND isp.id = sp.id
        GROUP BY isp.id
      `;

      const openHourTimeQuery =
        date.startAt && date.endAt
          ? Prisma.sql`AND (oh.startAt <= ${date.endAt} 
            AND oh.endAt >= ${date.startAt}) `
          : Prisma.empty;

      const blockedTimeQuery =
        date.startAt && date.endAt
          ? Prisma.sql`OR (bt.year = ${date.year} 
                            AND bt.month = ${date.month} 
                            AND bt.day = ${date.day}
                            AND (${date.startAt} < bt.endAt AND bt.startAt < ${date.endAt})
                          )`
          : Prisma.empty;

      const holidayQuery = Prisma.sql`
        SELECT hsp.id
        FROM Space hsp
        LEFT JOIN SpaceHoliday sh ON hsp.id = sh.spaceId
        LEFT JOIN BlockedTime bt ON hsp.id = bt.spaceId
        WHERE sp.id = hsp.id 
        AND (
          (IF(sh.interval = 1,sh.day = ${day} ,sh.day = ${day} AND sh.interval = ${week})) 
        ${blockedTimeQuery})
        GROUP BY hsp.id
      `;

      const openHourQuery = Prisma.sql`
        SELECT osp.id
        FROM Space osp
        LEFT JOIN OpenHour oh ON osp.id = oh.spaceId
        WHERE sp.id = osp.id AND oh.day = ${day} ${openHourTimeQuery}
      `;

      const rentalTypeQuery = Prisma.sql`
        SELECT rsp.id
        FROM Space rsp
        LEFT JOIN RentalType rt ON rsp.id = rt.spaceId
        WHERE sp.id = rsp.id AND rt.day = ${day}
      `;

      excludeQueries.push(query, holidayQuery);
      includeQueries.push(openHourQuery, rentalTypeQuery);
    }
    return { excludeQueries, includeQueries };
  }

  setType() {
    const location = this.query.getFindByLocationQuery();
    const isDistance = this.query.sort === 'DISTANCE' || Boolean(location);

    if (isDistance) {
      if (!this.query.lat && !this.query.lng && !this.query.distance) {
        throw new SpaceException(SPACE_ERROR_CODE.CURRENT_LOCATION_BAD_REQUEST);
      }
    }

    if (this.query.sort === 'POPULARITY') {
      this.type = 'POPULARITY';
    } else if (isDistance) {
      this.type = 'DISTANCE';
    }
  }
}
