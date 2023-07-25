import { Injectable } from '@nestjs/common';

import type { Prisma, SpaceHoliday } from '@prisma/client';
import { flatMap, flatten, range } from 'lodash';

import { getWeek } from '@/common/date';
import { INTERVAL_WEEK } from '@/interface/token.interface';
import { HolidayService } from '@/modules/holiday/holiday.service';
import { BlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { BlockedTimeDTO } from '@/modules/host/dto/blocked-time';
import { OpenHourDTO } from '@/modules/host/dto/openHour';
import { OpenHourRepository } from '@/modules/host/open-hour/open-hour.repository';
import { SpaceHolidayRepository } from '@/modules/host/space-holiday/space-holiday.repository';
import { DAY_ENUM, getDay } from '@/utils/validation/day.validation';

import { SpaceHolidayDTO } from '../dto/holiday';
import { PossibleRentalTypeByMonthQuery, PossibleRentalTypeQuery } from '../dto/query';
import { PossibleRentalTypePagingDTO } from '../dto/query/possible-rental-type-paging.dto';
import {
  PossiblePackageDTO,
  PossibleRentalTypeByMonthDTOProps,
  PossibleRentalTypeDTO,
  PossibleRentalTypesByMonthDTOProps,
  PossibleRentalTypesDTO,
  PossibleRentalTypesDTOProps,
  RentalTypeWithReservationDTO,
} from '../dto/rental-type';
import { PaginationPossibleRentalTypesByMonthDTO } from '../dto/rental-type/pagination-possible-rental-types-by-month.dto';
import { PossibleTimeCostInfoDTOProps } from '../dto/timeCostInfo/possible-time-cost-info.dto';
import { RENTAL_TYPE_ENUM } from '../dto/validation/rental-type.validation';
import { SpaceRepository } from '../space.repository';

import { RentalTypeRepository } from './rental-type.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly blockedTimeRepository: BlockedTimeRepository,
    private readonly holidayService: HolidayService,
    private readonly spaceHolidayRepository: SpaceHolidayRepository,
    private readonly openHourRepository: OpenHourRepository
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

    const openHours = await this.openHourRepository.findOpenHours({
      where: {
        spaceId,
      },
    });
    const spaceHolidays = await this.spaceHolidayRepository.findSpaceHolidays({
      where: {
        spaceId,
      },
    });

    return this.getPossibleRentalTypesBySpaceIdWithMonth(query, rentalTypes, spaceHolidays, openHours, blockedTimes);
  }

  async findPagingPossibleRentalTypesBySpaceIdWithMonth(spaceId: string, paging: PossibleRentalTypePagingDTO) {
    await this.spaceRepository.findSpace(spaceId);

    const data = await Promise.all(
      range(
        paging.page + Number(paging.startMonth) - 1,
        paging.page + Number(paging.startMonth) + paging.limit - 1
      ).map(async (month, index) => {
        const year = index !== 0 && month === 1 ? Number(paging.startYear) + 1 : Number(paging.startYear);
        const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
          {
            where: {
              spaceId,
            },
          },
          {
            where: {
              year: `${year}`,
              month: `${month}`,
            },
          }
        );

        const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
          where: {
            spaceId,
            year: `${year}`,
            month: `${month}`,
          },
        });
        const openHours = await this.openHourRepository.findOpenHours({
          where: {
            spaceId,
          },
        });
        const spaceHolidays = await this.spaceHolidayRepository.findSpaceHolidays({
          where: {
            spaceId,
          },
        });

        return await this.getPossibleRentalTypesBySpaceIdWithMonth(
          {
            year: `${year}`,
            month: `${month}`,
          },
          rentalTypes,
          spaceHolidays,
          openHours,
          blockedTimes
        );
      })
    );

    const result = new PaginationPossibleRentalTypesByMonthDTO({ data, paging });

    return result;
  }

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
    const targetDay = isHoliday ? DAY_ENUM.HOLIDAY : getDay(Number(query.year), Number(query.month), Number(query.day));

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

    const openHours = await this.openHourRepository.findOpenHours({
      where: {
        spaceId,
      },
    });

    const spaceHolidays = await this.spaceHolidayRepository.findSpaceHolidays({
      where: {
        spaceId,
      },
    });

    return this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, query);
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

    const openHours = await this.openHourRepository.findOpenHours({
      where: {
        spaceId: rentalType.spaceId,
      },
    });

    const spaceHolidays = await this.spaceHolidayRepository.findSpaceHolidays({
      where: {
        spaceId: rentalType.spaceId,
      },
    });

    return this.getPossibleRentalType(rentalType, blockedTimes, openHours, spaceHolidays);
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

    const openHours = await this.openHourRepository.findOpenHours({
      where: {
        space: {
          ...args.where,
        },
      },
    });

    const spaceHolidays = await this.spaceHolidayRepository.findSpaceHolidays({
      where: {
        space: { ...args.where },
      },
    });

    return this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, query);
  }

  async getPossibleRentalTypesBySpaceIdWithMonth(
    query: PossibleRentalTypeByMonthQuery,
    rentalTypes: RentalTypeWithReservationDTO[],
    spaceHolidays: SpaceHolidayDTO[],
    openHours: OpenHourDTO[],
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

        const result = this.getPossibleRentalTypesBySpaceId(parsedRentalType, blockedTimes, spaceHolidays, openHours, {
          year: query.year,
          month: query.month,
          day: `${day}`,
        });

        const currentDate = new Date(Number(query.year), Number(query.month) - 1, Number(day));

        const currentDay = isHoliday ? DAY_ENUM.HOLIDAY : getDay(Number(query.year), Number(query.month), Number(day));
        const week = getWeek(currentDate);
        const holidays = spaceHolidays.filter((holiday) => {
          if (holiday.interval === INTERVAL_WEEK.TWO) {
            return (week === 2 || week === 4) && holiday.day === currentDay;
          } else {
            return holiday.day === currentDay;
          }
        });
        const isImpossible =
          result.package.every((item) => !item.isPossible) &&
          (result.time ? result.time.timeCostInfos.every((item) => !item.isPossible) : true);

        const data: PossibleRentalTypeByMonthDTOProps = {
          day: `${day}`,
          isHoliday,
          isPossible: holidays.length > 0 ? false : !isImpossible,
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
    spaceHolidays: SpaceHolidayDTO[],
    openHours: OpenHourDTO[],
    targetDate?: PossibleRentalTypeQuery
  ) {
    const timeReservations = flatten(
      rentalTypes
        .filter((rentalType) => rentalType.rentalType === RENTAL_TYPE_ENUM.TIME)
        .map((rentalType) => rentalType.reservations)
    ).filter(Boolean);
    const packageReservations = flatten(
      rentalTypes
        .filter((rentalType) => rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE)
        .map((rentalType) => rentalType.reservations)
    ).filter(Boolean);

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

          //INFO: true로 초기화
          next.timeCostInfos.forEach((timeInfo) => {
            timeCostInfos.forEach((info) => {
              if (info.time === timeInfo.time) {
                info.cost = timeInfo.cost;
                info.isPossible = true;
              }
            });
          });

          //INFO: 이미 예약된 시간 정보
          [...timeReservations, ...packageReservations].forEach((reservation) => {
            if (
              targetDate.year === reservation.year &&
              targetDate.month === reservation.month &&
              targetDate.day === reservation.day
            ) {
              reservation.rentalTypes.forEach((reservedRentalType) => {
                const startAt =
                  reservedRentalType.startAt < 9 ? reservedRentalType.startAt + 24 : reservedRentalType.startAt;
                const endAt =
                  reservedRentalType.startAt >= reservedRentalType.endAt
                    ? reservedRentalType.endAt + 24
                    : reservedRentalType.endAt;
                range(startAt, endAt).forEach((hour) => {
                  const index = timeCostInfos.findIndex((timeCostInfo) =>
                    hour >= 24 ? timeCostInfo.time === hour - 24 : timeCostInfo.time === hour
                  );

                  if (index !== -1) {
                    timeCostInfos[index].isPossible = false;
                  }
                });
              });
            }
          });

          //INFO: 막아둔 날짜는 block
          blockedTimes.forEach((blockedTime) => {
            if (
              targetDate.year === blockedTime.year &&
              targetDate.month === blockedTime.month &&
              targetDate.day === blockedTime.day
            )
              for (let time = blockedTime.startAt; time <= blockedTime.endAt; time++) {
                timeCostInfos[time].isPossible = false;
              }
          });

          if (targetDate) {
            const isHoliday = this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
            const currentDay = isHoliday
              ? DAY_ENUM.HOLIDAY
              : getDay(Number(targetDate.year), Number(targetDate.month), Number(targetDate.day));

            const holidays = this.getHolidays(targetDate, spaceHolidays);
            if (holidays.length > 0) {
              acc.time = {
                ...next,

                timeCostInfos: timeCostInfos.map((timeCostInfo) => {
                  return {
                    ...timeCostInfo,
                    isPossible: false,
                  };
                }),
              };
            }

            openHours
              .filter((openHour) => openHour.day === currentDay)
              .forEach((openHour) => {
                const openStart = Number(openHour.startAt);
                const openEnd = Number(openHour.endAt) < 9 ? Number(openHour.endAt) + 24 : Number(openHour.endAt);
                timeCostInfos.forEach((timeCostInfo, index) => {
                  if (timeCostInfo.time < openStart || timeCostInfo.time > openEnd) {
                    timeCostInfos[index].isPossible = false;
                  }
                });
              });
          }

          acc.time = {
            ...next,
            timeCostInfos,
          };
        } else if (next.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          let isPossible = true;
          [...timeReservations, ...packageReservations].forEach((reservation) => {
            if (
              targetDate.year === reservation.year &&
              targetDate.month === reservation.month &&
              targetDate.day === reservation.day
            ) {
              reservation.rentalTypes.forEach((reservedRentalType) => {
                if (reservedRentalType.rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
                  isPossible = !(
                    next.startAt === reservedRentalType.startAt && next.endAt === reservedRentalType.endAt
                  );
                } else {
                  const startAt =
                    reservedRentalType.startAt < 9 ? reservedRentalType.startAt + 24 : reservedRentalType.startAt;
                  const endAt =
                    reservedRentalType.startAt >= reservedRentalType.endAt
                      ? reservedRentalType.endAt + 24
                      : reservedRentalType.endAt;
                  const nextStartAt = next.startAt;
                  const nextEndAt = next.startAt >= next.endAt ? next.endAt + 24 : next.endAt;
                  range(startAt, endAt + 1).forEach((hour) => {
                    if (nextStartAt <= hour && hour <= nextEndAt) isPossible = false;
                  });
                }
              });
            }
          });

          blockedTimes.forEach((blockedTime) => {
            if (
              targetDate.year === blockedTime.year &&
              targetDate.month === blockedTime.month &&
              targetDate.day === blockedTime.day &&
              blockedTime.startAt <= next.endAt &&
              blockedTime.endAt >= next.startAt
            )
              isPossible = false;
          });

          if (targetDate) {
            const isHoliday = this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
            const currentDay = isHoliday
              ? DAY_ENUM.HOLIDAY
              : getDay(Number(targetDate.year), Number(targetDate.month), Number(targetDate.day));

            const holidays = this.getHolidays(targetDate, spaceHolidays);
            if (holidays.length > 0) {
              isPossible = false;
            }

            openHours
              .filter((openHour) => openHour.day === currentDay)
              .forEach((openHour) => {
                const openStart = Number(openHour.startAt);
                const openEnd = Number(openHour.endAt) < 9 ? Number(openHour.endAt) + 24 : Number(openHour.endAt);
                if (next.startAt > openEnd || next.endAt < openStart) isPossible = false;
              });
          }

          acc.package.push({
            ...next,
            isPossible,
          });
        }

        return acc;
      },
      { time: null, package: [] }
    );

    return new PossibleRentalTypesDTO(possibleRentalTypes);
  }

  getPossibleRentalType(
    rentalType: RentalTypeWithReservationDTO,
    blockedTimes: BlockedTimeDTO[],
    openHours: OpenHourDTO[],
    spaceHolidays: SpaceHolidayDTO[]
  ) {
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
        reservation.rentalTypes.forEach((rentalType) => {
          range(rentalType.startAt, rentalType.endAt).forEach((hour) => {
            timeCostInfos[hour].isPossible = false;
          });
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

  getHolidays(targetDate: PossibleRentalTypeQuery, spaceHolidays: SpaceHolidayDTO[]) {
    const currentDate = new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day));
    const isHoliday = this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);

    const currentDay = isHoliday
      ? DAY_ENUM.HOLIDAY
      : getDay(Number(targetDate.year), Number(targetDate.month), Number(targetDate.day));
    const week = getWeek(currentDate);
    return spaceHolidays.filter((holiday) => {
      if (holiday.interval === INTERVAL_WEEK.TWO) {
        return (week === 2 || week === 4) && holiday.day === currentDay;
      } else {
        return holiday.day === currentDay;
      }
    });
  }
}
