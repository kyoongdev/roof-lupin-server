import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { range } from 'lodash';

import { getWeek } from '@/common/date';
import { PrismaService } from '@/database/prisma.service';
import { DAY_ENUM } from '@/utils/validation';

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
import {
  getCountDistanceSpacesSQL,
  getCountSpacesSQL,
  getFindSpacesSQL,
  getFindSpacesWithDistanceSQL,
  getFindSpacesWithPopularitySQL,
} from './sql';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly holidayService: HolidayService,
    private readonly searchRepository: SearchRepository,
    private readonly database: PrismaService
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

    const excludeQuery = await this.getExcludeSpaces(query);
    const baseWhere = query.generateSqlWhereClause(excludeQuery, userId);

    const sqlPaging = paging.getSqlPaging();
    let sqlQuery = getFindSpacesSQL(query, sqlPaging, baseWhere);
    if (!query.sort || query.sort === 'POPULARITY') {
      sqlQuery = getFindSpacesWithPopularitySQL(sqlPaging, baseWhere);
    } else if (isDistance) {
      sqlQuery = getFindSpacesWithDistanceSQL(location, sqlPaging, baseWhere);
    }
    const count = await this.spaceRepository.countSpacesWithSQL(
      isDistance ? getCountDistanceSpacesSQL(location, baseWhere) : getCountSpacesSQL(baseWhere)
    );
    const spaces = await this.spaceRepository.findSpacesWithSQL(sqlQuery, userId);

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
    const queries: Prisma.Sql[] = [];
    if (date) {
      const endAtIf = Prisma.sql`IF(ReservationRentalType.endAt <= ReservationRentalType.startAt, ReservationRentalType.endAt + 24, ReservationRentalType.endAt )`;
      const timeQuery =
        date?.startAt && date?.endAt
          ? Prisma.sql`AND (IF(RentalType.rentalType = 1, ${endAtIf} + 1, ${endAtIf}) >= ${date.startAt} AND ${
              date.endAt <= date.startAt ? date.endAt + 24 : date.endAt
            } >= ReservationRentalType.startAt)`
          : Prisma.sql`AND (      
            ${Prisma.join(
              range(9, 33).map((value) => {
                return Prisma.sql`(ReservationRentalType.startAt <= ${value} AND ${value} <= ${endAtIf})`;
              }),
              ` AND `
            )}
          ) `;

      const targetDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));

      const week = getWeek(new Date(Number(date.year), Number(date.month) - 1, Number(date.day)));
      const day = targetDate.getDay();

      const dateQuery = date
        ? Prisma.sql`(Reservation.isCanceled = 0 AND Reservation.deletedAt IS NULL AND Reservation.payedAt IS NOT NULL AND Reservation.year = ${date.year} AND Reservation.month = ${date.month} AND Reservation.day = ${date.day})${timeQuery}`
        : Prisma.empty;

      const query = Prisma.sql`
        SELECT isp.title
        FROM Reservation
        LEFT JOIN ReservationRentalType ON Reservation.id = ReservationRentalType.reservationId
        LEFT JOIN RentalType ON ReservationRentalType.rentalTypeId = RentalType.id
        LEFT JOIN Space isp ON RentalType.spaceId = isp.id
        LEFT JOIN SpaceHoliday sh ON isp.id = sh.spaceId
        LEFT JOIN OpenHour oh ON isp.id = oh.spaceId
        WHERE  ${dateQuery}
        GROUP BY isp.id
      `;
      const result = await this.database.$queryRaw(query);

      const openHourTimeQuery =
        date.startAt && date.endAt
          ? Prisma.sql`AND (oh.startAt > ${date.endAt} OR IF(oh.endAt < oh.startAt , oh.endAt + 24, oh.endAt) < ${date.startAt}) `
          : Prisma.empty;

      const holidayQuery = Prisma.sql`
        SELECT sp.id
        FROM Space sp
        LEFT JOIN SpaceHoliday sh ON sp.id = sh.spaceId
        LEFT JOIN OpenHour oh ON sp.id = oh.spaceId
        WHERE (sh.day = ${day} AND sh.interval = ${week})
        OR (oh.day = ${day}  ${openHourTimeQuery})
        GROUP BY sp.id
      `;

      const result2 = await this.database.$queryRaw(holidayQuery);

      queries.push(query);
      queries.push(holidayQuery);
    }
    return queries;
  }
}
