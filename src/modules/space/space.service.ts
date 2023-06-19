import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';
import { DistanceSpace, PopularSpace } from '@/interface/space.interface';

import { LatLngDTO } from '../location/dto';
import { LocationRepository } from '../location/location.repository';

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

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly locationRepository: LocationRepository,
    private readonly rentalTypeService: RentalTypeService,
    private readonly database: PrismaService
  ) {}

  async findSpaceIds() {
    return this.spaceRepository.findSpaceIds();
  }

  async findSpace(id: string, userId?: string) {
    return await this.spaceRepository.findSpace(id, userId);
  }

  async findSpacesWithPopularity(paging: PagingDTO, where: Prisma.Sql) {
    const spaces: PopularSpace[] = await this.database.$queryRaw`
          SELECT sp.id as id, AVG(sr.score) as averageScore, COUNT(si.spaceId) as userInterests,COUNT(sr.spaceId) as reviewCount
          FROM Space sp
          LEFT JOIN SpaceInterest si ON  sp.id = si.spaceId 
          LEFT JOIN SpaceReview sr ON sp.id = sr.spaceId
          INNER JOIN SpaceLocation sl ON sp.id = sl.spaceId
          INNER JOIN SpaceCategory sc ON sp.id = sc.spaceId 
          INNER JOIN Category ca ON sc.categoryId = ca.id 
          ${where}
          GROUP BY sp.id
          ORDER BY userInterests, averageScore,reviewCount
          LIMIT ${paging.page ?? 0},${paging.limit ?? 10}
      `;

    return spaces;
  }

  async findSpacesWithDistance(location: LatLngDTO, paging: PagingDTO, where: Prisma.Sql) {
    const spaces: DistanceSpace[] = await this.database.$queryRaw`
        SELECT sp.id as id,
        (6371*acos(cos(radians(${location.lat}))*cos(radians(sl.lat))*cos(radians(sl.lng)
        -radians(${location.lng}))+sin(radians(${location.lat}))*sin(radians(sl.lat))))
        AS distance
        FROM Space sp
        INNER JOIN SpaceLocation sl ON sp.id = sl.spaceId
        INNER JOIN SpaceCategory sc ON sp.id = sc.spaceId 
        INNER JOIN Category ca ON sc.categoryId = ca.id 
        ${where}
        ORDER BY distance 
        LIMIT ${paging.page ?? 0},${paging.limit ?? 10}
    `;

    return spaces;
  }

  async findPagingSpaces(
    paging: PagingDTO,
    args = {} as Prisma.SpaceFindManyArgs,
    query?: FindSpacesQuery,
    location?: FindByLocationQuery,
    date?: FindByDateQuery,
    userId?: string
  ) {
    const { skip, take } = paging.getSkipTake();
    const [includeSpaces, excludeSpaces] = await this.generateIncludeExcludeSpaces(paging, args, location, date);

    const whereArgs: Prisma.SpaceWhereInput = {
      ...(location && {
        OR: includeSpaces.map((spaceId) => ({
          id: spaceId,
        })),
      }),
      ...(excludeSpaces.length > 0 && {
        NOT: excludeSpaces.map((spaceId) => ({
          id: spaceId,
        })),
      }),

      ...args.where,
    };

    const count = await this.spaceRepository.countSpaces({
      where: whereArgs,
    });

    let spaces: SpaceDTO[] = [];
    if (query.sort === 'POPULARITY') {
      const popularitySpaces = await this.findSpacesWithPopularity(
        paging,
        SpaceDTO.generateSqlWhereClause(query, excludeSpaces, includeSpaces)
      );
      spaces = await Promise.all(
        popularitySpaces.map(async (space) => await this.spaceRepository.findCommonSpace(space.id, userId))
      );
    } else if (query.sort === 'DISTANCE') {
      if (!query.lat && !query.lng) {
        throw new SpaceException(SPACE_ERROR_CODE.BAD_REQUEST(CURRENT_LOCATION_BAD_REQUEST));
      }
      const distanceSpaces = await this.findSpacesWithDistance(
        {
          lat: query.lat,
          lng: query.lng,
        },
        paging,
        SpaceDTO.generateSqlWhereClause(query, excludeSpaces, includeSpaces)
      );
      spaces = await Promise.all(
        distanceSpaces.map(async (space) => await this.spaceRepository.findCommonSpace(space.id, userId))
      );
    } else {
      spaces = await this.spaceRepository.findSpaces(
        {
          where: whereArgs,
          orderBy: args.orderBy,
          skip,
          take,
        },
        userId
      );
    }

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

  async generateIncludeExcludeSpaces(
    paging: PagingDTO,
    args = {} as Prisma.SpaceFindManyArgs,
    location?: FindByLocationQuery,
    date?: FindByDateQuery,
    userId?: string
  ) {
    const includeSpaces: string[] = [];
    const excludeSpaces: string[] = [];
    if (userId) {
      const reports = await this.database.spaceReport.findMany({
        where: {
          userId,
        },
        select: {
          spaceId: true,
        },
      });
      excludeSpaces.push(...reports.map((report) => report.spaceId));
    }

    if (location) {
      includeSpaces.push(
        ...(await this.locationRepository.getLocationsByDistance(paging, location)).map((location) => location.spaceId)
      );
    }
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
          const possibleTimes: number[] = [];
          //INFO: 시간대별로 가능한 시간의 크기를 구함
          (reservation as PossibleRentalTypeDTO).timeCostInfos.reduce<number>((acc, timeCostInfo) => {
            if (timeCostInfo.isPossible) {
              acc += 1;
            } else {
              possibleTimes.push(acc);
              acc = 0;
            }
            return acc;
          }, 0);
          //INFO: 가장 길게 이용할 수 있는 시간
          const maxPossibleTime = Math.max(...possibleTimes);

          //INFO: 예약 가능 시간이 원하는 시간보다 작으면 제외
          if (maxPossibleTime < date.time) {
            isPossible = false;
          } else {
            isPossible = true;
          }
        } else if (reservation.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          const time = reservation.endAt - reservation.startAt;

          //INFO: 예약 가능 시간이 원하는 시간보다 작으면 제외
          if (!(reservation as PossiblePackageDTO).isPossible || time < date.time) {
            isPossible = false;
          } else {
            isPossible = true;
          }
        }

        if (isPossible) {
          //INFO: 가능한데, 제외되어있으면 제외 목록에서 제거
          if (excludeSpaces.includes(reservation.spaceId)) {
            excludeSpaces.splice(excludeSpaces.indexOf(reservation.spaceId), 1);
          }
          if (!acc.includes(reservation.spaceId)) {
            acc.push(reservation.spaceId);
          }
        } else if (!acc.includes(reservation.spaceId) && !excludeSpaces.includes(reservation.spaceId)) {
          excludeSpaces.push(reservation.spaceId);
        }
        return acc;
      }, []);
    }

    return [includeSpaces, excludeSpaces];
  }
}
