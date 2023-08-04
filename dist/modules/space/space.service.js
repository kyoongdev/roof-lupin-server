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
exports.SpaceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const lodash_1 = require("lodash");
const date_1 = require("../../common/date");
const holiday_service_1 = require("../holiday/holiday.service");
const search_repository_1 = require("../search/search.repository");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const space_exception_1 = require("./exception/space.exception");
const space_repository_1 = require("./space.repository");
const sql_1 = require("./sql");
let SpaceService = class SpaceService {
    constructor(spaceRepository, holidayService, searchRepository) {
        this.spaceRepository = spaceRepository;
        this.holidayService = holidayService;
        this.searchRepository = searchRepository;
    }
    async findSpaceIds() {
        return this.spaceRepository.findSpaceIds();
    }
    async findSpace(id, userId) {
        const space = await this.spaceRepository.findSpace(id, userId);
        if (userId) {
            await this.searchRepository.createRecentSpace(userId, id);
        }
        return space;
    }
    async findPagingSpaces(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.spaceRepository.countSpaces({
            where: args.where,
        });
        const spaces = await this.spaceRepository.findSpaces({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(spaces, { count, paging });
    }
    async findPagingSpacesWithSQL(paging, query, userId) {
        const location = query.getFindByLocationQuery();
        const isDistance = query.sort === 'DISTANCE' || Boolean(location);
        if (isDistance) {
            if (!query.lat && !query.lng && !query.distance) {
                throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.BAD_REQUEST(errorCode_1.CURRENT_LOCATION_BAD_REQUEST));
            }
        }
        if (query.keyword && userId) {
            await this.searchRepository.createSearchRecord(userId, {
                content: query.keyword,
            });
        }
        const excludeQuery = this.getExcludeSpaces(query);
        const baseWhere = query.generateSqlWhereClause(excludeQuery, userId);
        const sqlPaging = paging.getSqlPaging();
        let sqlQuery = (0, sql_1.getFindSpacesSQL)(query, sqlPaging, baseWhere);
        if (!query.sort || query.sort === 'POPULARITY') {
            sqlQuery = (0, sql_1.getFindSpacesWithPopularitySQL)(sqlPaging, baseWhere);
        }
        else if (isDistance) {
            sqlQuery = (0, sql_1.getFindSpacesWithDistanceSQL)(location, sqlPaging, baseWhere);
        }
        const count = await this.spaceRepository.countSpacesWithSQL(isDistance ? (0, sql_1.getCountDistanceSpacesSQL)(location, baseWhere) : (0, sql_1.getCountSpacesSQL)(baseWhere));
        const spaces = await this.spaceRepository.findSpacesWithSQL(sqlQuery, userId);
        return new cumuco_nestjs_1.PaginationDTO(spaces, { count, paging });
    }
    async findSpaces(args = {}) {
        return await this.spaceRepository.findSpaces(args);
    }
    async findSpaceIsInterested(userId, spaceId) {
        const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);
        return new dto_1.InterestedDTO({ isInterested });
    }
    async createInterest(userId, spaceId) {
        await this.findSpace(spaceId);
        const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);
        if (isInterested) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.CONFLICT(errorCode_1.ALREADY_INTERESTED));
        }
        await this.spaceRepository.createInterest(userId, spaceId);
    }
    async deleteInterest(userId, spaceId) {
        await this.findSpace(spaceId);
        const isInterested = await this.spaceRepository.checkIsInterested(userId, spaceId);
        if (!isInterested) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.CONFLICT(errorCode_1.NOT_INTERESTED));
        }
        await this.spaceRepository.deleteInterest(userId, spaceId);
    }
    getExcludeSpaces(query) {
        const date = query.getFindByDateQuery();
        const queries = [];
        if (date) {
            const timeQuery = date?.startAt && date?.endAt
                ? client_1.Prisma.sql `AND (IF(ReservationRentalType.endAt <= ReservationRentalType.startAt, ReservationRentalType.endAt + 24, ReservationRentalType.endAt ) >= ${date.startAt} AND  ${date.endAt <= date.startAt ? date.endAt + 24 : date.endAt} >= ReservationRentalType.startAt    )`
                : client_1.Prisma.sql `AND (      
            ${client_1.Prisma.join((0, lodash_1.range)(9, 33).map((value) => {
                    return client_1.Prisma.sql `(ReservationRentalType.startAt <= ${value} AND IF(ReservationRentalType.endAt <= ReservationRentalType.startAt, ReservationRentalType.endAt + 24, ReservationRentalType.endAt ) >= ${value}  )`;
                }), ` AND `)}
          ) `;
            const targetDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));
            const week = (0, date_1.getWeek)(new Date(Number(date.year), Number(date.month) - 1, Number(date.day)));
            const day = targetDate.getDay();
            const dateQuery = date
                ? client_1.Prisma.sql `(Reservation.year = ${date.year} AND Reservation.month = ${date.month} AND Reservation.day = ${date.day})${timeQuery}`
                : client_1.Prisma.empty;
            const query = client_1.Prisma.sql `
        SELECT isp.id
        FROM Reservation
        LEFT JOIN ReservationRentalType ON Reservation.id = ReservationRentalType.reservationId
        LEFT JOIN RentalType ON ReservationRentalType.rentalTypeId = RentalType.id
        LEFT JOIN Space isp ON RentalType.spaceId = isp.id
        LEFT JOIN SpaceHoliday sh ON isp.id = sh.spaceId
        LEFT JOIN OpenHour oh ON isp.id = oh.spaceId
        WHERE  ${dateQuery}
        GROUP BY isp.id
      `;
            const openHourTimeQuery = date.startAt && date.endAt
                ? client_1.Prisma.sql `AND oh.endAt <= ${date.startAt} OR oh.startAt >= ${date.endAt}`
                : client_1.Prisma.empty;
            const holidayQuery = client_1.Prisma.sql `
        SELECT sp.id
        FROM Space sp
        LEFT JOIN SpaceHoliday sh ON sp.id = sh.spaceId
        LEFT JOIN OpenHour oh ON sp.id = oh.spaceId
        WHERE sh.day = ${day} AND sh.interval = ${week}
        OR (oh.day != ${day}  ${openHourTimeQuery})
        GROUP BY sp.id
      `;
            queries.push(query, holidayQuery);
        }
        return queries;
    }
};
SpaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [space_repository_1.SpaceRepository,
        holiday_service_1.HolidayService,
        search_repository_1.SearchRepository])
], SpaceService);
exports.SpaceService = SpaceService;
//# sourceMappingURL=space.service.js.map