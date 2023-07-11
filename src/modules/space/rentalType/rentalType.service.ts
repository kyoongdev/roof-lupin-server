import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { range } from 'lodash';

import { HolidayService } from '@/modules/holiday/holiday.service';
import { BlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { BlockedTimeDTO } from '@/modules/host/dto/blocked-time';
import { DAY_ENUM, getDay } from '@/utils/validation/day.validation';

import { PossibleRentalTypeByMonthQuery, PossibleRentalTypeQuery } from '../dto/query';
import {
  PossiblePackageDTO,
  PossibleRentalTypeByMonthDTOProps,
  PossibleRentalTypeDTO,
  PossibleRentalTypesByMonthDTOProps,
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
    private readonly blockedTimeRepository: BlockedTimeRepository,
    private readonly holidayService: HolidayService
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

  async findPossibleRentalTypesBySpaceIdWithMonth(spaceId: string, query: PossibleRentalTypeByMonthQuery) {
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
        },
      }
    );

    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        spaceId,
        year: query.year,
        month: query.month,
      },
    });

    return this.getPossibleRentalTypesBySpaceIdWithMonth(query, rentalTypes, blockedTimes);
  }

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
    const targetDay = isHoliday
      ? DAY_ENUM.HOLIDAY
      : getDay(Number(query.year), Number(query.month) - 1, Number(query.day));

    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
      {
        where: {
          spaceId,
          day: targetDay,
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

  async getPossibleRentalTypesBySpaceIdWithMonth(
    query: PossibleRentalTypeByMonthQuery,
    rentalTypes: RentalTypeWithReservationDTO[],
    blockedTimes: BlockedTimeDTO[]
  ) {
    const possibleRentalTypes: PossibleRentalTypesByMonthDTOProps = {
      year: query.year,
      month: query.month,
      days: [],
    };
    const fullDays = new Date(Number(query.year), Number(query.month), 0).getDate();
    await Promise.all(
      range(1, fullDays + 1).map(async (day) => {
        const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, `${day}`);
        const parsedRentalType = rentalTypes
          .map((rentalType) => {
            if (rentalType.day === DAY_ENUM.HOLIDAY && isHoliday) {
              return rentalType;
            }
            if (rentalType.day !== DAY_ENUM.HOLIDAY && !isHoliday) {
              const currentDay = getDay(Number(query.year), Number(query.month), day);

              if (rentalType.day === currentDay) {
                return rentalType;
              } else {
                return null;
              }
            }

            return null;
          })
          .filter(Boolean);

        const result = this.getPossibleRentalTypesBySpaceId(parsedRentalType, blockedTimes, `${day}`);
        const isImpossible =
          result.package.every((item) => !item.isPossible) &&
          result.time.every((item) => item.timeCostInfos.every((timeCostInfo) => !timeCostInfo.isPossible));

        const data: PossibleRentalTypeByMonthDTOProps = {
          day: `${day}`,
          isHoliday,
          isPossible: !isImpossible,
          rentalType: result,
        };
        possibleRentalTypes.days.push(data);
      })
    );
    possibleRentalTypes.days.sort((a, b) => Number(a.day) - Number(b.day));
    return possibleRentalTypes;
  }

  getPossibleRentalTypesBySpaceId(
    rentalTypes: RentalTypeWithReservationDTO[],
    blockedTimes: BlockedTimeDTO[],
    targetDay?: string
  ) {
    const possibleRentalTypes = rentalTypes.reduce<PossibleRentalTypesDTOProps>(
      (acc, next) => {
        if (next.rentalType === RENTAL_TYPE_ENUM.TIME) {
          const timeCostInfos: PossibleTimeCostInfoDTOProps[] = [
            ...range(9, 24).map((hour: number) => ({
              cost: 0,
              isPossible: false,
              time: hour,
            })),
            ...range(0, 9).map((hour: number) => ({
              cost: 0,
              isPossible: false,
              time: hour,
            })),
          ];

          next.timeCostInfos.forEach((timeInfo) => {
            timeCostInfos.forEach((info) => {
              if (info.time === timeInfo.time) {
                info.cost = timeInfo.cost;
                info.isPossible = true;
              }
            });
          });
          next.reservations.forEach((reservation) => {
            if (targetDay === reservation.day)
              range(reservation.startAt, reservation.endAt).forEach((hour) => {
                timeCostInfos.forEach((info) => {
                  if (info.time === hour) {
                    info.isPossible = false;
                  }
                });
              });
          });
          blockedTimes.forEach((blockedTime) => {
            if (targetDay === blockedTime.day)
              for (let time = blockedTime.startAt; time <= blockedTime.endAt; time++) {
                timeCostInfos[time].isPossible = false;
              }
          });

          acc.time.push({
            ...next,
            timeCostInfos,
          });
        } else if (next.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          let isPossible = true;
          if (targetDay) {
            next.reservations.forEach((reservation) => {
              if (targetDay === reservation.day) isPossible = false;
            });
          } else {
            isPossible = next.reservations.length === 0;
          }

          blockedTimes.forEach((blockedTime) => {
            if (targetDay === blockedTime.day && blockedTime.startAt <= next.endAt && blockedTime.endAt >= next.startAt)
              isPossible = false;
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
      const timeCostInfos: PossibleTimeCostInfoDTOProps[] = [
        ...range(9, 24).map((hour: number) => ({
          cost: 0,
          isPossible: false,
          time: hour,
        })),
        ...range(0, 10).map((hour: number) => ({
          cost: 0,
          isPossible: false,
          time: hour,
        })),
      ];
      rentalType.timeCostInfos.forEach((timeInfo) => {
        timeCostInfos.forEach((info) => {
          if (info.time === timeInfo.time) {
            info.cost = timeInfo.cost;
            info.isPossible = true;
          }
        });
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
