import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { MaxPossibleTime } from '@/interface/space.interface';

import { LocationRepository } from '../location/location.repository';
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
    private readonly searchRepository: SearchRepository
  ) {}

  async findSpaceIds() {
    return this.spaceRepository.findSpaceIds();
  }

  async findSpace(id: string, userId?: string) {
    return await this.spaceRepository.findSpace(id, userId);
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

    const excludeSpaces = await this.getExcludeSpaces(args, date);
    const baseWhere = query.generateSqlWhereClause(excludeSpaces, userId);

    const sqlPaging = paging.getSqlPaging();
    let sqlQuery = getFindSpacesSQL(query, sqlPaging, baseWhere);
    if (query.sort === 'POPULARITY') {
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

  async getExcludeSpaces(args = {} as Prisma.SpaceFindManyArgs, date?: FindByDateQuery) {
    const excludeSpaces: string[] = [];

    if (date) {
      const results = await this.rentalTypeService.findPossibleRentalTypesBySpaces(
        {
          year: date.year,
          month: date.month,
          day: date.day,
        },
        args
      );

      const reservations = [...results.package, ...results.time];
      //INFO: acc는 가능한 시간의 집합 => 가능한 것이 우선순위가 높음
      reservations.reduce<string[]>((acc, reservation) => {
        let isPossible = true;
        if (reservation.rentalType === RENTAL_TYPE_ENUM.TIME) {
          //INFO: 시간대별로 가능한 시간 중 가장 긴 시간
          const maxPossibleTime = (reservation as PossibleRentalTypeDTO).timeCostInfos.reduce<MaxPossibleTime>(
            (acc, timeCostInfo) => {
              if (timeCostInfo.isPossible) {
                acc.accTime += 1;
              } else {
                acc.maxPossibleTime = acc.accTime;
                acc.accTime = 0;
              }
              return acc;
            },
            { maxPossibleTime: 0, accTime: 0 }
          ).maxPossibleTime;

          //INFO: 예약 가능 시간이 원하는 시간보다 작으면 제외
          isPossible = maxPossibleTime >= date.time;
        } else if (reservation.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          const time = reservation.endAt - reservation.startAt;

          //INFO: 예약 가능 시간이 원하는 시간보다 작으면 제외
          if (!(reservation as PossiblePackageDTO).isPossible || time < date.time) {
            isPossible = false;
          } else {
            isPossible = true;
          }
        }

        const isAlreadyExcluded = excludeSpaces.includes(reservation.spaceId);
        const isAlreadyIncluded = acc.includes(reservation.spaceId);
        if (isPossible) {
          //INFO: 가능한데, 제외되어있으면 제외 목록에서 제거
          if (isAlreadyExcluded) {
            excludeSpaces.splice(excludeSpaces.indexOf(reservation.spaceId), 1);
          }
          if (!isAlreadyIncluded) {
            acc.push(reservation.spaceId);
          }
        } else if (!isAlreadyIncluded && !isAlreadyExcluded) {
          excludeSpaces.push(reservation.spaceId);
        }
        return acc;
      }, []);
    }

    return excludeSpaces;
  }
}
