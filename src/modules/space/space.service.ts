import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { range } from 'lodash';

import { getWeek } from '@/common/date';
import { PrismaService } from '@/database/prisma.service';
import { DAY_ENUM, getDay } from '@/utils';

import { HolidayService } from '../holiday/holiday.service';
import { SearchRepository } from '../search/search.repository';

import { InterestedDTO, SpaceDTO } from './dto';
import { FindSpacesQuery } from './dto/query';
import {
  ALREADY_INTERESTED,
  CURRENT_LOCATION_BAD_REQUEST,
  NOT_INTERESTED,
  SPACE_ERROR_CODE,
} from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { SpaceRepository } from './space.repository';
import { getFindSpacesSQL, getFindSpacesWithDistanceSQL, getFindSpacesWithPopularitySQL } from './sql';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly searchRepository: SearchRepository,
    private readonly database: PrismaService,
    private readonly holidayService: HolidayService
  ) {}

  async findSpaceIds() {
    return this.spaceRepository.findSpaceIds();
  }

  async findSpace(id: string, userId?: string) {
    const space = await this.spaceRepository.findSpace(id, userId);
    if (userId) {
      await this.searchRepository.createRecentSpace(userId, id);
    }
    return space;
  }

  async findPagingSpaces(paging: PagingDTO, args = {} as Prisma.SpaceFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.spaceRepository.countSpaces({
      where: args.where,
    });
    const spaces = await this.spaceRepository.findSpaces({
      ...args,
      skip,
      take,
    });
    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findPagingSpacesWithSQL(paging: PagingDTO, query?: FindSpacesQuery, userId?: string) {
    const location = query.getFindByLocationQuery();
    const isDistance = query.sort === 'DISTANCE' || Boolean(location);

    if (isDistance) {
      if (!query.lat && !query.lng && !query.distance) {
        throw new SpaceException(SPACE_ERROR_CODE.BAD_REQUEST(CURRENT_LOCATION_BAD_REQUEST));
      }
    }

    if (query.keyword && userId) {
      await this.searchRepository.createSearchRecord(userId, {
        content: query.keyword,
      });
    }

    const { excludeQueries, includeQueries } = await this.getExcludeSpaces(query);
    const baseWhere = query.generateSqlWhereClause(excludeQueries, includeQueries, userId);

    const sqlPaging = paging.getSqlPaging();
    let sqlQuery = getFindSpacesSQL(query, sqlPaging, baseWhere, userId);
    if (query.sort === 'POPULARITY') {
      sqlQuery = getFindSpacesWithPopularitySQL(sqlPaging, baseWhere, userId);
    } else if (isDistance) {
      sqlQuery = getFindSpacesWithDistanceSQL(location, sqlPaging, baseWhere, userId);
    }

    const { spaces, count } = await this.spaceRepository.findSpacesWithSQL(sqlQuery, userId);

    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces(args);
  }

  async findSpaceIsInterested(userId: string, spaceId: string) {
    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    return new InterestedDTO({ isInterested });
  }

  async createInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(ALREADY_INTERESTED));
    }

    await this.spaceRepository.createInterest(userId, spaceId);
  }

  async deleteInterest(userId: string, spaceId: string) {
    await this.findSpace(spaceId);

    const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);

    if (!isInterested) {
      throw new SpaceException(SPACE_ERROR_CODE.CONFLICT(NOT_INTERESTED));
    }

    await this.spaceRepository.deleteInterest(userId, spaceId);
  }

  async getExcludeSpaces(query?: FindSpacesQuery) {
    const date = query.getFindByDateQuery();
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

      const isHoliday = await this.holidayService.checkIsHoliday(date.year, date.month, date.day);
      const week = getWeek(new Date(Number(date.year), Number(date.month) - 1, Number(date.day)));
      const day = getDay(Number(date.year), Number(date.month), Number(date.day), isHoliday.isHoliday);

      const dateQuery = date
        ? Prisma.sql`(Reservation.isCanceled = 0 AND Reservation.deletedAt IS NULL AND Reservation.payedAt IS NOT NULL AND Reservation.year = ${date.year} AND Reservation.month = ${date.month} AND Reservation.day = ${date.day})${timeQuery}`
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
        AND ((sh.day = ${day} AND sh.interval = ${week})
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
}
