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
exports.SettlementRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const dto_1 = require("../../reservation/dto");
const settlement_1 = require("../dto/settlement");
const errorCode_1 = require("./exception/errorCode");
const settlement_exception_1 = require("./exception/settlement.exception");
let SettlementRepository = class SettlementRepository {
    constructor(database) {
        this.database = database;
    }
    async checkSettlementByHostAndDate(year, month, day, hostId) {
        const settlement = await this.database.settlement.findFirst({
            where: {
                year,
                month,
                day,
                reservations: {
                    some: {
                        rentalTypes: {
                            some: {
                                rentalType: {
                                    space: {
                                        hostId,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return !!settlement;
    }
    async findSettlement(id) {
        const settlement = await this.database.settlement.findUnique({
            where: {
                id,
            },
            include: {
                reservations: {
                    include: {
                        user: true,
                        spaceReviews: true,
                        rentalTypes: {
                            include: {
                                rentalType: {
                                    include: {
                                        timeCostInfo: true,
                                        space: {
                                            include: {
                                                reviews: true,
                                                location: true,
                                                publicTransportations: true,
                                                rentalType: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                host: true,
            },
        });
        if (!settlement) {
            throw new settlement_exception_1.SettlementException(errorCode_1.SETTLEMENT_ERROR_CODE.NOT_FOUND(errorCode_1.SETTLEMENT_NOT_FOUND));
        }
        const { reservations, ...rest } = settlement;
        return new settlement_1.SettlementDetailDTO({
            ...rest,
            reservations: reservations.map(dto_1.ReservationDTO.generateReservationDTO),
        });
    }
    async findSettlementByDate(year, month, day, hostId) {
        const settlement = await this.database.settlement.findFirst({
            where: {
                year,
                month,
                day,
                hostId,
            },
            include: {
                reservations: {
                    include: {
                        user: true,
                        spaceReviews: true,
                        rentalTypes: {
                            include: {
                                rentalType: {
                                    include: {
                                        timeCostInfo: true,
                                        space: {
                                            include: {
                                                reviews: true,
                                                location: true,
                                                publicTransportations: true,
                                                rentalType: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                host: true,
            },
        });
        if (!settlement) {
            throw new settlement_exception_1.SettlementException(errorCode_1.SETTLEMENT_ERROR_CODE.NOT_FOUND(errorCode_1.SETTLEMENT_NOT_FOUND));
        }
        const { reservations, ...rest } = settlement;
        return new settlement_1.SettlementDetailDTO({
            ...rest,
            reservations: reservations.map(dto_1.ReservationDTO.generateReservationDTO),
        });
    }
    async checkSettlementByDate(year, month, day, hostId) {
        const settlement = await this.database.settlement.findFirst({
            where: {
                year,
                month,
                day,
                hostId,
            },
            include: {
                reservations: {
                    include: {
                        user: true,
                        spaceReviews: true,
                        rentalTypes: {
                            include: {
                                rentalType: {
                                    include: {
                                        timeCostInfo: true,
                                        space: {
                                            include: {
                                                reviews: true,
                                                location: true,
                                                publicTransportations: true,
                                                rentalType: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                host: true,
            },
        });
        if (!settlement) {
            return false;
        }
        const { reservations, ...rest } = settlement;
        return new settlement_1.SettlementDetailDTO({
            ...rest,
            reservations: reservations.map(dto_1.ReservationDTO.generateReservationDTO),
        });
    }
    async countSettlements(args = {}) {
        return await this.database.settlement.count(args);
    }
    async findSettlements(args = {}) {
        const settlements = await this.database.settlement.findMany({
            where: args.where,
            orderBy: {
                year: 'asc',
                month: 'asc',
                day: 'asc',
                ...args.orderBy,
            },
            ...args,
        });
        return settlements.map((settlement) => new settlement_1.SettlementDTO(settlement));
    }
    async createSettlement(data) {
        const { reservationIds, hostId, ...rest } = data;
        const settlement = await this.database.settlement.create({
            data: {
                ...rest,
                reservations: {
                    connect: [...reservationIds.map((id) => ({ id }))],
                },
                host: {
                    connect: {
                        id: hostId,
                    },
                },
            },
        });
        return settlement.id;
    }
    async createSettlementWithTransaction(database, data) {
        const { reservationIds, hostId, ...rest } = data;
        const settlement = await database.settlement.create({
            data: {
                ...rest,
                reservations: {
                    connect: [...reservationIds.map((id) => ({ id }))],
                },
                host: {
                    connect: {
                        id: hostId,
                    },
                },
            },
        });
        return settlement.id;
    }
    async updateSettlement(id, data) {
        const { reservationIds, ...rest } = data;
        const updateArgs = {
            where: {
                id,
            },
            data: {
                ...rest,
            },
        };
        if (data.reservationIds) {
            updateArgs.data = {
                ...updateArgs.data,
                reservations: {
                    deleteMany: {},
                    connect: [...reservationIds.map((id) => ({ id }))],
                },
            };
        }
        await this.database.settlement.update(updateArgs);
    }
    async updateSettlementWithTransaction(database, id, data) {
        const { reservationIds, ...rest } = data;
        const updateArgs = {
            where: {
                id,
            },
            data: {
                ...rest,
            },
        };
        if (data.reservationIds) {
            updateArgs.data = {
                ...updateArgs.data,
                reservations: {
                    deleteMany: {},
                    connect: [...reservationIds.map((id) => ({ id }))],
                },
            };
        }
        await database.settlement.update(updateArgs);
    }
    async deleteSettlement(id) {
        await this.database.settlement.delete({
            where: {
                id,
            },
        });
    }
};
SettlementRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettlementRepository);
exports.SettlementRepository = SettlementRepository;
//# sourceMappingURL=settlement.repository.js.map