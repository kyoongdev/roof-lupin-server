"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalTypeService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const date_1 = require("../../../common/date");
const token_interface_1 = require("../../../interface/token.interface");
const holiday_service_1 = require("../../holiday/holiday.service");
const blocked_time_repository_1 = require("../../host/blocked-time/blocked-time.repository");
const open_hour_repository_1 = require("../../host/open-hour/open-hour.repository");
const space_holiday_repository_1 = require("../../host/space-holiday/space-holiday.repository");
const day_validation_1 = require("../../../utils/validation/day.validation");
const rental_type_1 = require("../dto/rental-type");
const pagination_possible_rental_types_by_month_dto_1 = require("../dto/rental-type/pagination-possible-rental-types-by-month.dto");
const rental_type_validation_1 = require("../dto/validation/rental-type.validation");
const space_repository_1 = require("../space.repository");
const rental_type_repository_1 = require("./rental-type.repository");
let RentalTypeService = class RentalTypeService {
    constructor(spaceRepository, rentalTypeRepository, blockedTimeRepository, holidayService, spaceHolidayRepository, openHourRepository) {
        this.spaceRepository = spaceRepository;
        this.rentalTypeRepository = rentalTypeRepository;
        this.blockedTimeRepository = blockedTimeRepository;
        this.holidayService = holidayService;
        this.spaceHolidayRepository = spaceHolidayRepository;
        this.openHourRepository = openHourRepository;
    }
    async findSpaceRentalTypes(spaceId, args = {}) {
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
    async findSpaceRentalTypeDetail(spaceId) {
        await this.spaceRepository.findSpace(spaceId);
        return await this.rentalTypeRepository.findSpaceRentalTypeDetail(spaceId);
    }
    async findPossibleRentalTypesBySpaceIdWithMonth(spaceId, query) {
        await this.spaceRepository.findSpace(spaceId);
        const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations({
            where: {
                spaceId,
            },
        }, {
            where: {
                year: Number(query.year),
                month: Number(query.month),
            },
        });
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
        return await this.getPossibleRentalTypesBySpaceIdWithMonth(query, rentalTypes, spaceHolidays, openHours, blockedTimes);
    }
    async findPagingPossibleRentalTypesBySpaceIdWithMonth(spaceId, paging) {
        await this.spaceRepository.findSpace(spaceId);
        const data = await Promise.all((0, lodash_1.range)(paging.page + Number(paging.startMonth) - 1, paging.page + Number(paging.startMonth) + paging.limit - 1).map(async (month, index) => {
            const currentYear = month / 12 > 1 ? Number(paging.startYear) + Math.floor(month / 12) : Number(paging.startYear);
            const currentMonth = month % 12 === 0 ? 12 : month % 12;
            const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations({
                where: {
                    spaceId,
                },
            }, {
                where: {
                    year: currentYear,
                    month: currentMonth,
                },
            });
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
            return await this.getPossibleRentalTypesBySpaceIdWithMonth({
                year: `${currentYear}`,
                month: `${currentMonth}`,
            }, rentalTypes, spaceHolidays, openHours, blockedTimes);
        }));
        const result = new pagination_possible_rental_types_by_month_dto_1.PaginationPossibleRentalTypesByMonthDTO({ data, paging });
        return result;
    }
    async findPossibleRentalTypesBySpaceId(spaceId, query) {
        const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, query.day);
        const targetDay = isHoliday ? day_validation_1.DAY_ENUM.HOLIDAY : (0, day_validation_1.getDay)(Number(query.year), Number(query.month), Number(query.day));
        const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations({
            where: {
                spaceId,
                day: targetDay,
            },
        }, {
            where: {
                year: Number(query.year),
                month: Number(query.month),
                day: Number(query.day),
            },
        });
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
    async findPossibleRentalTypesById(id, query) {
        const rentalType = await this.rentalTypeRepository.findRentalTypeWithReservations(id, {
            where: {
                year: Number(query.year),
                month: Number(query.month),
                day: Number(query.day),
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
        return await this.getPossibleRentalType(rentalType, rentalType.reservations, blockedTimes, openHours, spaceHolidays, query);
    }
    async findPossibleRentalTypesBySpaces(query, args = {}) {
        const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations({
            where: {
                space: {
                    ...args.where,
                },
            },
        }, {
            where: {
                year: Number(query.year),
                month: Number(query.month),
                day: Number(query.day),
            },
        });
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
    async getPossibleRentalTypesBySpaceIdWithMonth(query, rentalTypes, spaceHolidays, openHours, blockedTimes) {
        const possibleRentalTypes = {
            year: query.year,
            month: query.month,
            days: [],
        };
        const fullDays = new Date(Number(query.year), Number(query.month), 0).getDate();
        await Promise.all((0, lodash_1.range)(1, fullDays + 1).map(async (day) => {
            const isHoliday = await this.holidayService.checkIsHoliday(query.year, query.month, `${day}`);
            const parsedRentalType = rentalTypes
                .map((rentalType) => {
                if (rentalType.day === day_validation_1.DAY_ENUM.HOLIDAY && isHoliday) {
                    return rentalType;
                }
                if (rentalType.day !== day_validation_1.DAY_ENUM.HOLIDAY && !isHoliday) {
                    const currentDay = (0, day_validation_1.getDay)(Number(query.year), Number(query.month), day);
                    if (rentalType.day === currentDay) {
                        return rentalType;
                    }
                    else {
                        return null;
                    }
                }
                return null;
            })
                .filter(Boolean);
            const result = await this.getPossibleRentalTypesBySpaceId(parsedRentalType, blockedTimes, spaceHolidays, openHours, {
                year: query.year,
                month: query.month,
                day: `${day}`,
            });
            const currentDate = new Date(Number(query.year), Number(query.month) - 1, Number(day));
            const currentDay = isHoliday ? day_validation_1.DAY_ENUM.HOLIDAY : (0, day_validation_1.getDay)(Number(query.year), Number(query.month), Number(day));
            const week = (0, date_1.getWeek)(currentDate);
            const holidays = spaceHolidays.filter((holiday) => {
                if (holiday.interval === token_interface_1.INTERVAL_WEEK.TWO) {
                    return (week === 2 || week === 4) && holiday.day === currentDay;
                }
                else {
                    return holiday.day === currentDay;
                }
            });
            const isImpossible = result.package.every((item) => !item.isPossible) &&
                (result.time ? result.time.timeCostInfos.every((item) => !item.isPossible) : true);
            const data = {
                day: `${day}`,
                isHoliday,
                isPossible: holidays.length > 0 ? false : !isImpossible,
                rentalType: result,
            };
            possibleRentalTypes.days.push(data);
        }));
        possibleRentalTypes.days.sort((a, b) => Number(a.day) - Number(b.day));
        return possibleRentalTypes;
    }
    async getPossibleRentalTypesBySpaceId(rentalTypes, blockedTimes, spaceHolidays, openHours, targetDate) {
        const timeReservations = (0, lodash_1.flatten)(rentalTypes
            .filter((rentalType) => rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.TIME)
            .map((rentalType) => rentalType.reservations)).filter(Boolean);
        const packageReservations = (0, lodash_1.flatten)(rentalTypes
            .filter((rentalType) => rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.PACKAGE)
            .map((rentalType) => rentalType.reservations)).filter(Boolean);
        const result = {
            time: null,
            package: [],
        };
        await Promise.all(rentalTypes.map(async (rentalType) => {
            const possibleRentalType = await this.getPossibleRentalType(rentalType, [...timeReservations, ...packageReservations], blockedTimes, openHours, spaceHolidays, targetDate);
            if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.TIME) {
                result.time = possibleRentalType;
            }
            else if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.PACKAGE) {
                result.package.push(possibleRentalType);
            }
        }));
        return new rental_type_1.PossibleRentalTypesDTO(result);
    }
    async getPossibleRentalType(rentalType, reservations, blockedTimes, openHours, spaceHolidays, targetDate) {
        if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.TIME) {
            const timeCostInfos = [
                ...(0, lodash_1.range)(9, 24).map((hour) => ({
                    cost: 0,
                    isPossible: false,
                    time: hour,
                })),
                ...(0, lodash_1.range)(0, 10).map((hour) => ({
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
                if (targetDate.year === reservation.year &&
                    targetDate.month === reservation.month &&
                    targetDate.day === reservation.day) {
                    reservation.rentalTypes.forEach((reservedRentalType) => {
                        const startAt = reservedRentalType.startAt < 9 ? reservedRentalType.startAt + 24 : reservedRentalType.startAt;
                        const endAt = reservedRentalType.startAt >= reservedRentalType.endAt
                            ? reservedRentalType.endAt + 24
                            : reservedRentalType.endAt;
                        (0, lodash_1.range)(startAt, endAt).forEach((hour) => {
                            const index = timeCostInfos.findIndex((timeCostInfo) => hour >= 24 ? timeCostInfo.time === hour - 24 : timeCostInfo.time === hour);
                            if (index !== -1) {
                                timeCostInfos[index].isPossible = false;
                            }
                        });
                    });
                }
            });
            blockedTimes.forEach((blockedTime) => {
                if (targetDate.year === blockedTime.year &&
                    targetDate.month === blockedTime.month &&
                    targetDate.day === blockedTime.day)
                    for (let time = blockedTime.startAt; time <= blockedTime.endAt; time++) {
                        timeCostInfos[time].isPossible = false;
                    }
            });
            if (targetDate) {
                const isHoliday = await this.holidayService.checkIsHoliday(targetDate.year, targetDate.month, targetDate.day);
                const currentDay = isHoliday
                    ? day_validation_1.DAY_ENUM.HOLIDAY
                    : new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day)).getDay();
                const holidays = this.getHolidays(targetDate, spaceHolidays);
                if (holidays.length > 0) {
                    timeCostInfos.forEach((timeCostInfo, index) => {
                        timeCostInfos[index].isPossible = false;
                    });
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
            return new rental_type_1.PossibleRentalTypeDTO({
                ...rentalType,
                timeCostInfos,
            });
        }
        else if (rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.PACKAGE) {
            let isPossible = true;
            reservations.forEach((reservation) => {
                if (targetDate.year === reservation.year &&
                    targetDate.month === reservation.month &&
                    targetDate.day === reservation.day) {
                    reservation.rentalTypes.forEach((reservedRentalType) => {
                        if (reservedRentalType.rentalType.rentalType === rental_type_validation_1.RENTAL_TYPE_ENUM.PACKAGE) {
                            isPossible = !(rentalType.startAt === reservedRentalType.startAt && rentalType.endAt === reservedRentalType.endAt);
                        }
                        else {
                            const startAt = reservedRentalType.startAt < 9 ? reservedRentalType.startAt + 24 : reservedRentalType.startAt;
                            const endAt = reservedRentalType.startAt >= reservedRentalType.endAt
                                ? reservedRentalType.endAt + 24
                                : reservedRentalType.endAt;
                            const nextStartAt = rentalType.startAt;
                            const nextEndAt = rentalType.startAt >= rentalType.endAt ? rentalType.endAt + 24 : rentalType.endAt;
                            (0, lodash_1.range)(startAt, endAt + 1).forEach((hour) => {
                                if (nextStartAt <= hour && hour <= nextEndAt)
                                    isPossible = false;
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
                    ? day_validation_1.DAY_ENUM.HOLIDAY
                    : (0, day_validation_1.getDay)(Number(targetDate.year), Number(targetDate.month), Number(targetDate.day));
                const holidays = this.getHolidays(targetDate, spaceHolidays);
                if (holidays.length > 0) {
                    isPossible = false;
                }
                openHours
                    .filter((openHour) => openHour.day === currentDay)
                    .forEach((openHour) => {
                    const openStart = Number(openHour.startAt);
                    const openEnd = Number(openHour.endAt) < 9 ? Number(openHour.endAt) + 24 : Number(openHour.endAt);
                    if (rentalType.startAt > openEnd || rentalType.endAt < openStart)
                        isPossible = false;
                });
            }
            return new rental_type_1.PossiblePackageDTO({
                ...rentalType,
                isPossible,
            });
        }
    }
    getHolidays(targetDate, spaceHolidays) {
        const currentDate = new Date(Number(targetDate.year), Number(targetDate.month) - 1, Number(targetDate.day));
        const currentDay = currentDate.getDay();
        const week = (0, date_1.getWeek)(currentDate);
        return spaceHolidays.filter((holiday) => {
            return holiday.interval === week && holiday.day === currentDay;
        });
    }
};
RentalTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [space_repository_1.SpaceRepository,
        rental_type_repository_1.RentalTypeRepository,
        blocked_time_repository_1.BlockedTimeRepository,
        holiday_service_1.HolidayService,
        space_holiday_repository_1.SpaceHolidayRepository,
        open_hour_repository_1.OpenHourRepository])
], RentalTypeService);
exports.RentalTypeService = RentalTypeService;
//# sourceMappingURL=rental-type.service.js.map