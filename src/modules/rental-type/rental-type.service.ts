import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { flatten, range } from 'lodash';

import { getWeek } from '@/common/date';
import { INTERVAL_WEEK } from '@/interface/token.interface';
import { HolidayService } from '@/modules/holiday/holiday.service';
import { HostBlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { BlockedTimeDTO } from '@/modules/host/dto/blocked-time';
import { OpenHourDTO } from '@/modules/host/dto/openHour';
import { HostOpenHourRepository } from '@/modules/host/open-hour/open-hour.repository';
import { HostSpaceHolidayRepository } from '@/modules/host/space-holiday/space-holiday.repository';
import { ReservationDTO } from '@/modules/reservation/dto';
import { DAY_ENUM, getDay } from '@/utils/validation/day.validation';

import { SpaceHolidayDTO } from '../space/dto/holiday';
import { PossibleRentalTypeByMonthQuery, PossibleRentalTypeQuery } from '../space/dto/query';
import { PossibleRentalTypePagingDTO } from '../space/dto/query/possible-rental-type-paging.dto';
import { PossibleTimeCostInfoDTOProps } from '../space/dto/timeCostInfo/possible-time-cost-info.dto';
import { SpaceRepository } from '../space/space.repository';

import {
  PossiblePackageDTO,
  PossibleRentalTypeByMonthDTOProps,
  PossibleRentalTypeDTO,
  PossibleRentalTypesByMonthDTOProps,
  PossibleRentalTypesDTO,
  PossibleRentalTypesDTOProps,
  RentalTypeWithReservationDTO,
} from './dto';
import { PaginationPossibleRentalTypesByMonthDTO } from './dto/pagination-possible-rental-types-by-month.dto';
import { FindSpaceRentalTypeQuery } from './dto/query';
import { RENTAL_TYPE_ENUM } from './dto/validation/rental-type.validation';
import { RentalTypeRepository } from './rental-type.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly blockedTimeRepository: HostBlockedTimeRepository,
    private readonly holidayService: HolidayService,
    private readonly spaceHolidayRepository: HostSpaceHolidayRepository,
    private readonly openHourRepository: HostOpenHourRepository
  ) {}

  async findSpaceRentalTypes(spaceId: string, query: FindSpaceRentalTypeQuery) {
    await this.spaceRepository.findSpace(spaceId);

    const args: Prisma.RentalTypeFindManyArgs = {
      where: {},
    };

    if (query.day && query.month && query.year) {
      const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
      const targetDate = new Date(Number(query.year), Number(query.month) - 1, Number(query.day), 14, 0, 0);
      const day = isHoliday ? DAY_ENUM.HOLIDAY : targetDate.getDay();

      args.where = {
        day,
      };
    }

    const rentalTypes = await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
        ...args.where,
      },
      orderBy: {
        rentalType: 'asc',
      },
    });
    rentalTypes.forEach((rentalType) => rentalType.applyNextDayToTimeCostInfos());
    return rentalTypes;
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
          year: Number(query.year),
          month: Number(query.month),
          isCanceled: false,
          deletedAt: null,
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

    return await this.getPossibleRentalTypesBySpaceIdWithMonth(
      query,
      rentalTypes,
      spaceHolidays,
      openHours,
      blockedTimes
    );
  }

  async findPagingPossibleRentalTypesBySpaceIdWithMonth(spaceId: string, paging: PossibleRentalTypePagingDTO) {
    await this.spaceRepository.findSpace(spaceId);

    const data = await Promise.all(
      range(
        paging.page + Number(paging.startMonth) - 1,
        paging.page + Number(paging.startMonth) + paging.limit - 1
      ).map(async (month, index) => {
        const currentYear =
          month / 12 > 1 ? Number(paging.startYear) + Math.floor(month / 12) : Number(paging.startYear);
        const currentMonth = month % 12 === 0 ? 12 : month % 12;

        const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
          {
            where: {
              spaceId,
            },
          },
          {
            where: {
              year: currentYear,
              month: currentMonth,
              isCanceled: false,
              deletedAt: null,
            },
          }
        );

        const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
          where: {
            spaceId,
            year: `${currentYear}`,
            month: `${currentMonth}`,
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
            year: `${currentYear}`,
            month: `${currentMonth}`,
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
          year: Number(query.year),
          month: Number(query.month),
          day: Number(query.day),
          isCanceled: false,
          deletedAt: null,
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

    return await this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, query);
  }
  async findPossibleRentalTypesById(id: string, query: PossibleRentalTypeQuery) {
    const rentalType = await this.rentalTypeRepository.findRentalTypeWithReservations(id, {
      where: {
        year: Number(query.year),
        month: Number(query.month),
        day: Number(query.day),
        isCanceled: false,
        deletedAt: null,
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

    return await this.getPossibleRentalType(
      rentalType,
      rentalType.reservations,
      blockedTimes,
      openHours,
      spaceHolidays,
      query
    );
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
          year: Number(query.year),
          month: Number(query.month),
          day: Number(query.day),
          isCanceled: false,
          deletedAt: null,
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

    return await this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, query);
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

        const result = await this.getPossibleRentalTypesBySpaceId(
          parsedRentalType,
          blockedTimes,
          spaceHolidays,
          openHours,
          {
            year: query.year,
            month: query.month,
            day: `${day}`,
          }
        );

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

  async getPossibleRentalTypesBySpaceId(
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

    const result: PossibleRentalTypesDTOProps = {
      time: null,
      package: [],
    };

    await Promise.all(
      rentalTypes.map(async (rentalType) => {
        const possibleRentalType = await this.getPossibleRentalType(
          rentalType,
          [...timeReservations, ...packageReservations],
          blockedTimes,
          openHours,
          spaceHolidays,
          targetDate
        );
        if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
          result.time = possibleRentalType;
        } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
          result.package.push(possibleRentalType as PossiblePackageDTO);
        }
      })
    );

    return new PossibleRentalTypesDTO(result);
  }

  async getPossibleRentalType(
    rentalType: RentalTypeWithReservationDTO,
    reservations: ReservationDTO[],
    blockedTimes: BlockedTimeDTO[],
    openHours: OpenHourDTO[],
    spaceHolidays: SpaceHolidayDTO[],
    targetDate: PossibleRentalTypeQuery
  ) {
    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      const timeCostInfos: PossibleTimeCostInfoDTOProps[] = [
        ...range(9, 33).map((hour: number) => ({
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

      reservations.forEach((reservation) => {
        if (
          targetDate.year === reservation.year &&
          targetDate.month === reservation.month &&
          targetDate.day === reservation.day
        ) {
          reservation.rentalTypes.forEach((reservedRentalType) => {
            const startAt = reservedRentalType.startAt;
            const endAt = reservedRentalType.endAt;
            range(startAt, endAt).forEach((hour) => {
              const index = timeCostInfos.findIndex((timeCostInfo) => timeCostInfo.time === hour);

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
        const isHoliday = await this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
        const currentDay = isHoliday
          ? DAY_ENUM.HOLIDAY
          : new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day)).getDay();

        const holidays = this.getHolidays(targetDate, spaceHolidays);
        if (holidays.length > 0) {
          timeCostInfos.forEach((_, index) => {
            timeCostInfos[index].isPossible = false;
          });
        }

        openHours
          .filter((openHour) => openHour.day === currentDay)
          .forEach((openHour) => {
            const openStart = openHour.startAt;
            const openEnd = openHour.endAt - 1;

            timeCostInfos.forEach((timeCostInfo, index) => {
              if (!(timeCostInfo.time >= openStart && timeCostInfo.time <= openEnd)) {
                timeCostInfos[index].isPossible = false;
              }
            });
          });
      }

      return new PossibleRentalTypeDTO({
        ...rentalType,
        timeCostInfos: timeCostInfos.map((info) => info),
      });
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      let isPossible = true;

      reservations.forEach((reservation) => {
        if (
          targetDate.year === reservation.year &&
          targetDate.month === reservation.month &&
          targetDate.day === reservation.day
        ) {
          reservation.rentalTypes.forEach((reservedRentalType) => {
            if (reservedRentalType.rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
              isPossible = !(
                rentalType.startAt === reservedRentalType.startAt && rentalType.endAt === reservedRentalType.endAt
              );
            } else {
              const startAt = reservedRentalType.startAt;
              const endAt = reservedRentalType.endAt;
              const nextStartAt = rentalType.startAt;
              const nextEndAt = rentalType.endAt;
              range(startAt, endAt + 1).forEach((hour) => {
                if (nextStartAt <= hour && hour <= nextEndAt) isPossible = false;
              });
            }
          });
        }
      });

      blockedTimes.forEach((blockedTime) => {
        if (blockedTime.startAt <= rentalType.endAt && blockedTime.endAt >= rentalType.startAt) {
          isPossible = false;
        }
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
            const openStart = openHour.startAt;
            const openEnd = openHour.endAt;

            if (!(rentalType.endAt <= openEnd && rentalType.startAt >= openStart)) isPossible = false;
          });
      }

      return new PossiblePackageDTO({
        ...rentalType,
        isPossible,
      });
    }
  }

  getHolidays(targetDate: PossibleRentalTypeQuery, spaceHolidays: SpaceHolidayDTO[]) {
    const currentDate = new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day));
    const currentDay = currentDate.getDay();

    const week = getWeek(currentDate);

    return spaceHolidays.filter((holiday) => {
      return holiday.interval === week && holiday.day === currentDay;
    });
  }
}
