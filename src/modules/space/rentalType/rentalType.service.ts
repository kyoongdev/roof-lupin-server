import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { range } from 'lodash';

import { BlockedTimeRepository } from '@/modules/blocked-time/blocked-time.repository';
import { BlockedTimeDTO } from '@/modules/blocked-time/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { PossibleRentalTypeQuery } from '../dto/query';
import {
  PossiblePackageDTO,
  PossibleRentalTypeDTO,
  PossibleRentalTypesDTO,
  PossibleRentalTypesDTOProps,
  RentalTypeWithReservationDTO,
} from '../dto/rentalType';
import { PossibleTimeCostInfoDTOProps } from '../dto/timeCostInfo/possible-time-cost-info.dto';
import { RENTAL_TYPE_ENUM } from '../dto/validation/rental-type.validation';
import { SpaceRepository } from '../space.repository';

import { RentalTypeRepository } from './rentalType.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly blockedTimeRepository: BlockedTimeRepository
  ) {}

  async findSpaceRentalTypes(spaceId: string, args = {} as Prisma.RentalTypeFindManyArgs) {
    await this.spaceRepository.findSpace(spaceId);
    return await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
        ...args.where,
      },
      orderBy: {
        rentalType: 'asc',
      },
    });
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    await this.spaceRepository.findSpace(spaceId);
    return await this.rentalTypeRepository.findSpaceRentalTypeDetail(spaceId);
  }

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    await this.spaceRepository.findSpace(spaceId);
    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
      {
        where: {
          spaceId,
        },
      },
      {
        where: {
          year: query.year,
          month: query.month,
          day: query.day,
        },
      }
    );
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        spaceId,
        year: query.year,
        month: query.month,
        day: query.day,
      },
    });

    return this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes);
  }
  async findPossibleRentalTypesById(id: string, query: PossibleRentalTypeQuery) {
    const rentalType = await this.rentalTypeRepository.findRentalTypeWithReservations(id, {
      where: {
        year: query.year,
        month: query.month,
        day: query.day,
      },
    });
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        spaceId: rentalType.spaceId,
        year: query.year,
        month: query.month,
        day: query.day,
      },
    });

    return this.getPossibleRentalType(rentalType, blockedTimes);
  }

  async findPossibleRentalTypesBySpaces(query: PossibleRentalTypeQuery, args = {} as Prisma.SpaceFindManyArgs) {
    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
      {
        where: {
          space: {
            ...args.where,
          },
        },
      },
      {
        where: {
          year: query.year,
          month: query.month,
          day: query.day,
        },
      }
    );
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        space: {
          ...args.where,
        },
        year: query.year,
        month: query.month,
        day: query.day,
      },
    });
    return this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes);
  }

  getPossibleRentalTypesBySpaceId(rentalTypes: RentalTypeWithReservationDTO[], blockedTimes: BlockedTimeDTO[]) {
    const possibleRentalTypes = rentalTypes.reduce<PossibleRentalTypesDTOProps>(
      (acc, next) => {
        if (next.rentalType === RENTAL_TYPE_ENUM.TIME) {
          const timeCostInfos: PossibleTimeCostInfoDTOProps[] = range(0, 24).map((hour) => ({
            cost: 0,
            isPossible: false,
            time: hour,
          }));
          next.timeCostInfos.forEach((timeInfo) => {
            timeCostInfos[timeInfo.time].cost = timeInfo.cost;
            timeCostInfos[timeInfo.time].isPossible = true;
          });
          next.reservations.forEach((reservation) => {
            range(reservation.startAt, reservation.endAt).forEach((hour) => {
              timeCostInfos[hour].isPossible = false;
            });
          });
          blockedTimes.forEach((blockedTime) => {
            for (let time = blockedTime.startAt; time <= blockedTime.endAt; time++) {
              timeCostInfos[time].isPossible = false;
            }
          });

          acc.time.push({
            ...next,
            timeCostInfos,
          });
        } else if (next.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          let isPossible = next.reservations.length === 0;
          blockedTimes.forEach((blockedTime) => {
            if (blockedTime.startAt <= next.endAt && blockedTime.endAt >= next.startAt) {
              isPossible = false;
            }
          });

          acc.package.push({
            ...next,
            isPossible,
          });
        }

        return acc;
      },
      { time: [], package: [] }
    );
    return new PossibleRentalTypesDTO(possibleRentalTypes);
  }
  getPossibleRentalType(rentalType: RentalTypeWithReservationDTO, blockedTimes: BlockedTimeDTO[]) {
    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      const timeCostInfos: PossibleTimeCostInfoDTOProps[] = range(0, 24).map((hour) => ({
        cost: 0,
        isPossible: false,
        time: hour,
      }));
      timeCostInfos.forEach((timeInfo) => {
        timeCostInfos[timeInfo.time].cost = timeInfo.cost;
        timeCostInfos[timeInfo.time].isPossible = true;
      });
      rentalType.reservations.forEach((reservation) => {
        range(reservation.startAt, reservation.endAt).forEach((hour) => {
          timeCostInfos[hour].isPossible = false;
        });
      });
      blockedTimes.forEach((blockedTime) => {
        for (let time = blockedTime.startAt; time <= blockedTime.endAt; time++) {
          timeCostInfos[time].isPossible = false;
        }
      });

      return new PossibleRentalTypeDTO({
        ...rentalType,
        timeCostInfos,
      });
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      let isPossible = rentalType.reservations.length === 0;
      blockedTimes.forEach((blockedTime) => {
        if (blockedTime.startAt <= rentalType.endAt && blockedTime.endAt >= rentalType.startAt) {
          isPossible = false;
        }
      });
      return new PossiblePackageDTO({
        ...rentalType,
        isPossible,
      });
    }
  }
}
