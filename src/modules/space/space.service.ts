import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { MaxPossibleTime } from '@/interface/space.interface';

import { ReservationRepository } from '../reservation/reservation.repository';
import { SearchRepository } from '../search/search.repository';

import { InterestedDTO, SpaceDTO } from './dto';
import { FindSpacesQuery } from './dto/query';
import { FindByDateQuery } from './dto/query/find-by-date.query';
import { FindByLocationQuery } from './dto/query/find-by-location.query';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from './dto/rentalType';
import { RENTAL_TYPE_ENUM } from './dto/validation/rental-type.validation';
import {
  ALREADY_INTERESTED,
  CURRENT_LOCATION_BAD_REQUEST,
  NOT_INTERESTED,
  SPACE_ERROR_CODE,
} from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { RentalTypeService } from './rentalType/rentalType.service';
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
    private readonly rentalTypeService: RentalTypeService,
    private readonly searchRepository: SearchRepository,
    private readonly reservationRepository: ReservationRepository,
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

  async findPagingSpaces(
    paging: PagingDTO,
    args = {} as Prisma.SpaceFindManyArgs,
    query?: FindSpacesQuery,
    location?: FindByLocationQuery,
    date?: FindByDateQuery,
    userId?: string
  ) {
    const isDistance = query.sort === 'DISTANCE' || location;

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

    const excludeQuery = this.getExcludeSpaces(date);
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
    const spaces = await this.spaceRepository.findSpacesWithSQL(sqlQuery);

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

  getExcludeSpaces(date?: FindByDateQuery) {
    const timeQuery =
      date.startAt && date.endAt
        ? Prisma.sql`
        AND (
          ReservationRentalType.startAt >= ${date.startAt} AND ReservationRentalType.endAt <= ${date.endAt}
        )
      `
        : Prisma.empty;

    const dateQuery = date
      ? Prisma.sql`AND Reservation.year = ${date.year} AND Reservation.month = ${date.month} AND Reservation.day = ${date.day} ${timeQuery}`
      : Prisma.empty;

    const query = Prisma.sql`
        SELECT isp.id
        FROM Reservation
        INNER JOIN ReservationRentalType ON Reservation.id = ReservationRentalType.reservationId
        INNER JOIN RentalType ON ReservationRentalType.rentalTypeId = RentalType.id
        INNER JOIN Space isp ON RentalType.spaceId = isp.id
        WHERE 1 = 1 ${dateQuery}
        GROUP BY isp.id
      `;

    return query;
  }
}
