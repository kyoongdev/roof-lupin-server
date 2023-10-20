import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { flatten, range } from 'lodash';

import { checkIsAfterDate, checkIsSameDate, getWeek } from '@/common/date';
import { HolidayService } from '@/modules/holiday/holiday.service';
import { HostBlockedTimeRepository } from '@/modules/host/blocked-time/blocked-time.repository';
import { BlockedTimeDTO } from '@/modules/host/dto/blocked-time';
import { OpenHourDTO } from '@/modules/host/dto/openHour';
import { HostOpenHourRepository } from '@/modules/host/open-hour/open-hour.repository';
import { HostSpaceHolidayRepository } from '@/modules/host/space-holiday/space-holiday.repository';
import { ReservationDTO } from '@/modules/reservation/dto';
import { getDay } from '@/utils/validation/day.validation';

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
      const day = getDay(Number(query.year), Number(query.month), Number(query.day), isHoliday.isHoliday);

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
          cancel: null,
          deletedAt: null,
        },
      }
    );

    const { blockedTimes, openHours, spaceHolidays } = await this.getSpaceSubTimes(spaceId, {
      year: query.year,
      month: query.month,
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

    const data = await Promise.all(
      range(
        paging.page + Number(paging.startMonth) - 1,
        paging.page + Number(paging.startMonth) + paging.limit - 1
      ).map(async (month) => {
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
              cancel: null,
              deletedAt: null,
            },
          }
        );

        const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
          where: {
            spaceId,
            year: currentYear,
            month: currentMonth,
            deletedAt: null,
          },
        });

        return await this.getPossibleRentalTypesBySpaceIdWithMonth(
          {
            year: currentYear,
            month: currentMonth,
          },
          rentalTypes,
          spaceHolidays,
          openHours,
          blockedTimes
        );
      })
    );

    return new PaginationPossibleRentalTypesByMonthDTO({ data, paging });
  }

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
    const targetDay = getDay(Number(query.year), Number(query.month), Number(query.day), isHoliday.isHoliday);

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
          cancel: null,
          deletedAt: null,
        },
      }
    );

    const { blockedTimes, openHours, spaceHolidays } = await this.getSpaceSubTimes(spaceId, {
      year: query.year,
      month: query.month,
      day: query.day,
    });

    return await this.getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, query);
  }

  async findPossibleRentalTypesById(id: string, query: PossibleRentalTypeQuery) {
    const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
    const targetDay = getDay(query.year, query.month, query.day, isHoliday.isHoliday);

    const rentalType = await this.rentalTypeRepository.findRentalTypeWithReservations(
      id,
      {
        where: {
          day: targetDay,
        },
      },
      {
        where: {
          year: Number(query.year),
          month: Number(query.month),
          day: Number(query.day),
          cancel: null,
          deletedAt: null,
        },
      }
    );

    const { blockedTimes, openHours, spaceHolidays } = await this.getSpaceSubTimes(rentalType.spaceId, {
      year: query.year,
      month: query.month,
      day: query.day,
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
          cancel: null,
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
        deletedAt: null,
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

  async getSpaceSubTimes(spaceId: string, args = {} as Prisma.BlockedTimeWhereInput) {
    const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
      where: {
        ...args,
        spaceId,
        deletedAt: null,
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
    return { blockedTimes, openHours, spaceHolidays };
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
    const currentDate = new Date();
    await Promise.all(
      range(1, fullDays + 1).map(async (day) => {
        const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, day);

        const parsedRentalType = rentalTypes
          .map((rentalType) =>
            rentalType.getCurrentDayRentalType(isHoliday.isHoliday, {
              ...query,
              day: day,
            })
          )
          .filter(Boolean);

        const result = await this.getPossibleRentalTypesBySpaceId(
          parsedRentalType,
          blockedTimes,
          spaceHolidays,
          openHours,
          {
            year: query.year,
            month: query.month,
            day: day,
          }
        );

        const targetDate = new Date(Number(query.year), Number(query.month) - 1, Number(day));

        const currentDay = isHoliday.getCurrentDay({
          ...query,
          day: day,
        });
        const week = getWeek(targetDate);

        const holidays = spaceHolidays.filter((holiday) => holiday.checkWeekIsHoliday(week, currentDay));

        const isImpossible =
          result.package.every((item) => !item.isPossible) &&
          (result.time ? result.time.timeCostInfos.every((item) => !item.isPossible) : true);

        const isAfter = checkIsAfterDate(new Date(query.year, query.month), currentDate, true);

        const data: PossibleRentalTypeByMonthDTOProps = {
          day,
          isHoliday: isHoliday.isHoliday,
          isPossible: isAfter ? false : holidays.length > 0 ? false : !isImpossible,
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
    const currentDate = new Date();

    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      const timeCostInfos: PossibleTimeCostInfoDTOProps[] = [
        ...range(9, 33).map((hour: number) => ({
          cost: 0,
          isPossible: false,
          time: hour,
        })),
      ];

      const isAfter = checkIsAfterDate(new Date(targetDate.year, targetDate.month - 1, targetDate.day), currentDate);

      rentalType.timeCostInfos.forEach((timeInfo) => {
        timeCostInfos.forEach((info) => {
          if (info.time === timeInfo.time) {
            info.cost = timeInfo.cost;
            info.isPossible = checkIsSameDate(
              currentDate,
              new Date(targetDate.year, targetDate.month - 1, targetDate.day)
            )
              ? !(info.time <= currentDate.getHours())
              : isAfter
              ? false
              : true;
          }
        });
      });

      reservations.forEach((reservation) => {
        if (reservation.checkIsTargetDay(targetDate)) {
          reservation.rentalTypes.forEach((reservedRentalType) => {
            const startAt = reservedRentalType.startAt;
            const endAt = reservedRentalType.endAt;

            range(startAt, endAt + 1).forEach((hour) => {
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
        if (blockedTime.checkIsTargetDay(targetDate))
          for (let time = blockedTime.startAt; time < blockedTime.endAt; time++) {
            timeCostInfos[time].isPossible = false;
          }
      });

      if (targetDate) {
        const isHoliday = await this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
        const currentDay = isHoliday.getCurrentDay(targetDate);

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
              if (!(timeCostInfo.time >= openStart && timeCostInfo.time < openEnd)) {
                timeCostInfos[index].isPossible = false;
              }
            });
          });
      }

      return new PossibleRentalTypeDTO({
        ...rentalType,
        timeCostInfos,
      });
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      const isAfter = checkIsAfterDate(new Date(targetDate.year, targetDate.month - 1, targetDate.day), currentDate);
      let isPossible = isAfter ? false : true;
      if (
        checkIsSameDate(new Date(targetDate.year, targetDate.month - 1, targetDate.day), currentDate) &&
        rentalType.startAt <= currentDate.getHours()
      ) {
        isPossible = false;
      }

      reservations.forEach((reservation) => {
        if (reservation.checkIsTargetDay(targetDate)) {
          reservation.rentalTypes.forEach((reservedRentalType) => {
            if (reservedRentalType.rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
              isPossible = !(
                rentalType.startAt === reservedRentalType.startAt && rentalType.endAt === reservedRentalType.endAt
              );
            } else {
              const startAt = reservedRentalType.startAt;
              const endAt = reservedRentalType.endAt + 1;
              const nextStartAt = rentalType.startAt;
              const nextEndAt = rentalType.endAt;

              range(startAt, endAt).forEach((hour) => {
                if (nextStartAt <= hour && hour < nextEndAt) isPossible = false;
              });
            }
          });
        }
      });

      blockedTimes.forEach((blockedTime) => {
        if (rentalType.endAt >= blockedTime.startAt && blockedTime.endAt >= rentalType.startAt) {
          isPossible = false;
        }
      });

      if (targetDate) {
        const isHoliday = await this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
        const currentDay = isHoliday.getCurrentDay(targetDate);

        const holidays = this.getHolidays(targetDate, spaceHolidays);

        if (holidays.length > 0) {
          isPossible = false;
        }
        openHours
          .filter((openHour) => openHour.day === currentDay)
          .forEach((openHour) => {
            const openStart = openHour.startAt;
            const openEnd = openHour.endAt;

            if (!(openStart <= rentalType.startAt && rentalType.endAt <= openEnd)) isPossible = false;
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
