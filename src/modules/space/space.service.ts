import { Injectable } from '@nestjs/common';

import type { Prisma, Reservation, SpaceLocation } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { LocationRepository } from '../location/location.repository';
import { ReservationRepository } from '../reservation/reservation.repository';

import { SpaceDTO } from './dto';
import { FindByDateQuery } from './dto/query/find-by-date.query';
import { FindByLocationQuery } from './dto/query/find-by-location.query';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from './dto/rentalType';
import { ALREADY_INTERESTED, NOT_INTERESTED, SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { RentalTypeService } from './rentalType/rentalType.service';
import { SpaceRepository } from './space.repository';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly locationRepository: LocationRepository,
    private readonly rentalTypeService: RentalTypeService
  ) {}

  async findSpace(id: string, userId?: string) {
    return await this.spaceRepository.findSpace(id, userId);
  }

  async findPagingSpaces(
    paging: PagingDTO,
    args = {} as Prisma.SpaceFindManyArgs,
    location?: FindByLocationQuery,
    date?: FindByDateQuery
  ) {
    const { skip, take } = paging.getSkipTake();
    const includeSpaces: string[] = [];
    const excludeSpaces: string[] = [];
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
        if (reservation.rentalType === '시간') {
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
        } else if (reservation.rentalType === '패키지') {
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

    const whereArgs: Prisma.SpaceWhereInput = {
      ...(includeSpaces.length > 0 && {
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
    const spaces = await this.spaceRepository.findSpaces({
      where: whereArgs,
      orderBy: args.orderBy,
      skip,
      take,
    });

    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    return await this.spaceRepository.findSpaces(args);
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
}
