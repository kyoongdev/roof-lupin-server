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
exports.BlockedTimeService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const reservation_repository_1 = require("../../reservation/reservation.repository");
const space_repository_1 = require("../../space/space.repository");
const blocked_time_repository_1 = require("./blocked-time.repository");
const blocked_time_1 = require("./exception/blocked-time");
const errorCode_1 = require("./exception/errorCode");
let BlockedTimeService = class BlockedTimeService {
    constructor(blockedTimeRepository, reservationRepository, spaceRepository) {
        this.blockedTimeRepository = blockedTimeRepository;
        this.reservationRepository = reservationRepository;
        this.spaceRepository = spaceRepository;
    }
    async findBlockedTime(id) {
        return await this.blockedTimeRepository.findBlockedTime(id);
    }
    async findPagingBlockedTimes(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.blockedTimeRepository.countBlockedTimes({
            where: args.where,
        });
        const blockedTimes = await this.blockedTimeRepository.findBlockedTimes({
            where: args.where,
            orderBy: [
                {
                    year: 'desc',
                },
                {
                    month: 'desc',
                },
                {
                    day: 'desc',
                },
            ],
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(blockedTimes, { paging, count });
    }
    async createBlockedTime(hostId, data) {
        const space = await this.spaceRepository.findSpace(data.spaceId);
        if (space.host.id !== hostId) {
            throw new blocked_time_1.BlockedTimeException(errorCode_1.BLOCKED_TIME_ERROR_CODE.FORBIDDEN(errorCode_1.BLOCKED_TIME_MUTATION_FORBIDDEN));
        }
        const reservations = await this.reservationRepository.findReservations({
            where: {
                year: Number(data.year),
                month: Number(data.month),
                day: Number(data.day),
                rentalTypes: {
                    some: {
                        rentalType: {
                            spaceId: data.spaceId,
                        },
                    },
                },
            },
        });
        this.validateBlockTime(data.startAt, data.endAt, reservations);
        return await this.blockedTimeRepository.createBlockedTime(data);
    }
    async updateBlockedTime(id, hostId, data) {
        const blockedTime = await this.findBlockedTime(id);
        const space = await this.spaceRepository.findSpace(blockedTime.spaceId);
        if (space.host.id !== hostId) {
            throw new blocked_time_1.BlockedTimeException(errorCode_1.BLOCKED_TIME_ERROR_CODE.FORBIDDEN(errorCode_1.BLOCKED_TIME_MUTATION_FORBIDDEN));
        }
        const reservations = await this.reservationRepository.findReservations({
            where: {
                year: Number(data.year),
                month: Number(data.month),
                day: Number(data.day),
                rentalTypes: {
                    some: {
                        rentalType: {
                            spaceId: blockedTime.spaceId,
                        },
                    },
                },
            },
        });
        this.validateBlockTime(data.startAt, data.endAt, reservations);
        return await this.blockedTimeRepository.updateBlockedTime(id, data);
    }
    async deleteBlockedTime(id, hostId) {
        const blockedTime = await this.findBlockedTime(id);
        const space = await this.spaceRepository.findSpace(blockedTime.spaceId);
        if (space.host.id !== hostId) {
            throw new blocked_time_1.BlockedTimeException(errorCode_1.BLOCKED_TIME_ERROR_CODE.FORBIDDEN(errorCode_1.BLOCKED_TIME_MUTATION_FORBIDDEN));
        }
        await this.blockedTimeRepository.deleteBlockedTime(id);
    }
    validateBlockTime(startAt, endAt, reservations) {
        reservations.forEach(({ rentalTypes }) => {
            rentalTypes.forEach((rentalType) => {
                if (startAt <= rentalType.endAt && rentalType.startAt <= endAt) {
                    throw new blocked_time_1.BlockedTimeException(errorCode_1.BLOCKED_TIME_ERROR_CODE.CONFLICT(errorCode_1.BLOCKED_TIME_RESERVATION_EXISTS));
                }
            });
        });
    }
};
BlockedTimeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blocked_time_repository_1.BlockedTimeRepository,
        reservation_repository_1.ReservationRepository,
        space_repository_1.SpaceRepository])
], BlockedTimeService);
exports.BlockedTimeService = BlockedTimeService;
//# sourceMappingURL=blocked-time.service.js.map