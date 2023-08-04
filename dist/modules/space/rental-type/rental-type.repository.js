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
exports.RentalTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const query_1 = require("../../../common/constants/query");
const prisma_service_1 = require("../../../database/prisma.service");
const dto_1 = require("../../reservation/dto");
const dto_2 = require("../dto");
const additional_service_1 = require("../dto/additional-service");
const rental_type_1 = require("../dto/rental-type");
const errorCode_1 = require("../exception/errorCode");
const space_exception_1 = require("../exception/space.exception");
let RentalTypeRepository = class RentalTypeRepository {
    constructor(database) {
        this.database = database;
    }
    async findRentalTypeAdditionalServices(id) {
        const rentalType = await this.database.rentalType.findUnique({
            where: {
                id,
            },
            include: {
                additionalServices: true,
            },
        });
        if (!rentalType) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.NOT_FOUND(errorCode_1.RENTAL_TYPE_NOT_FOUND));
        }
        return rentalType.additionalServices.map((service) => new additional_service_1.AdditionalServiceDTO(service));
    }
    async findRentalType(id) {
        const rentalType = await this.database.rentalType.findUnique({
            where: {
                id,
            },
            include: {
                timeCostInfo: {
                    orderBy: {
                        time: 'asc',
                    },
                },
                additionalServices: true,
            },
        });
        if (!rentalType) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.NOT_FOUND(errorCode_1.RENTAL_TYPE_NOT_FOUND));
        }
        return new rental_type_1.RentalTypeDTO(rentalType);
    }
    async findRentalTypes(args = {}) {
        const rentalTypes = await this.database.rentalType.findMany({
            ...args,
            where: {
                ...args.where,
            },
            include: {
                timeCostInfo: {
                    orderBy: {
                        time: 'asc',
                    },
                },
                additionalServices: true,
            },
        });
        return rentalTypes.map((rentalType) => new rental_type_1.RentalTypeDTO(rentalType));
    }
    async findRentalTypesWithReservations(args = {}, reservationArgs = {}) {
        const rentalTypes = await this.database.rentalType.findMany({
            ...args,
            where: {
                ...args.where,
            },
            include: {
                timeCostInfo: {
                    orderBy: {
                        time: 'asc',
                    },
                },
                additionalServices: true,
                reservations: {
                    where: {
                        reservation: {
                            ...reservationArgs.where,
                        },
                    },
                    include: {
                        reservation: {
                            include: query_1.reservationInclude,
                        },
                    },
                },
            },
        });
        return rentalTypes.map((rentalType) => new rental_type_1.RentalTypeWithReservationDTO({
            id: rentalType.id,
            baseCost: rentalType.baseCost,
            name: rentalType.name,
            rentalType: rentalType.rentalType,
            timeCostInfo: rentalType.timeCostInfo,
            reservations: rentalType.reservations.map(({ reservation }) => {
                return dto_1.ReservationDTO.generateReservationDTO(reservation);
            }),
            baseHour: rentalType.baseHour,
            endAt: rentalType.endAt,
            startAt: rentalType.startAt,
            spaceId: rentalType.spaceId,
            day: rentalType.day,
            additionalServices: rentalType.additionalServices,
        }));
    }
    async findRentalTypeWithReservations(id, reservationArgs = {}) {
        const rentalType = await this.database.rentalType.findUnique({
            where: {
                id,
            },
            include: {
                additionalServices: true,
                timeCostInfo: {
                    orderBy: {
                        time: 'asc',
                    },
                },
                reservations: {
                    where: {
                        reservation: {
                            ...reservationArgs.where,
                        },
                    },
                    include: {
                        reservation: {
                            include: {
                                user: true,
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
                                                        userInterests: true,
                                                        rentalType: true,
                                                        categories: {
                                                            include: {
                                                                category: true,
                                                            },
                                                        },
                                                        reports: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                spaceReviews: true,
                            },
                        },
                    },
                },
            },
        });
        if (!rentalType) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.NOT_FOUND(errorCode_1.RENTAL_TYPE_NOT_FOUND));
        }
        return new rental_type_1.RentalTypeWithReservationDTO({
            id: rentalType.id,
            baseCost: rentalType.baseCost,
            name: rentalType.name,
            rentalType: rentalType.rentalType,
            timeCostInfo: rentalType.timeCostInfo,
            reservations: rentalType.reservations.map(({ reservation }) => {
                const { rentalTypes, ...rest } = reservation;
                const { space } = rentalTypes[0].rentalType;
                return {
                    ...rest,
                    year: String(rest.year),
                    month: String(rest.month),
                    day: String(rest.day),
                    rentalTypes: rentalTypes.map((rentalType) => rentalType),
                    space: dto_2.SpaceDTO.generateSpaceDTO(space),
                    isReviewed: rest.spaceReviews.length > 0,
                };
            }),
            baseHour: rentalType.baseHour,
            day: rentalType.day,
            endAt: rentalType.endAt,
            startAt: rentalType.startAt,
            spaceId: rentalType.spaceId,
            additionalServices: rentalType.additionalServices,
        });
    }
    async findSpaceRentalTypeDetail(spaceId) {
        const rentalTypes = await this.database.rentalType.findMany({
            where: {
                spaceId,
            },
            include: {
                timeCostInfo: {
                    orderBy: {
                        time: 'asc',
                    },
                },
                additionalServices: true,
            },
        });
        return new rental_type_1.SpaceRentalTypeDTO(rentalTypes);
    }
    async createRentalTypes(prisma, spaceId, data) {
        await Promise.all(data.map(async (rentalType) => {
            const { timeCostInfos, additionalServices, ...rest } = rentalType;
            const createArgs = {
                data: {
                    ...rest,
                    space: {
                        connect: {
                            id: spaceId,
                        },
                    },
                    additionalServices: {
                        create: additionalServices.map((service) => service),
                    },
                },
            };
            if (rest.rentalType === 1) {
                createArgs.data = {
                    ...createArgs.data,
                    timeCostInfo: {
                        create: timeCostInfos.map((timeCostInfo) => timeCostInfo),
                    },
                };
            }
            await prisma.rentalType.create(createArgs);
        }));
    }
    async updateRentalType(rentalTypeId, data) {
        const { timeCostInfos, additionalServices, ...rest } = data;
        const updateArgs = {
            where: {
                id: rentalTypeId,
            },
            data: {
                ...rest,
            },
        };
        if (additionalServices) {
            updateArgs.data = {
                ...updateArgs.data,
                additionalServices: {
                    deleteMany: {
                        rentalTypeId,
                    },
                    create: additionalServices.map((service) => service),
                },
            };
        }
        if (timeCostInfos) {
            updateArgs.data = {
                ...updateArgs.data,
                timeCostInfo: {
                    deleteMany: {
                        rentalTypeId,
                    },
                    create: timeCostInfos.map((timeCostInfo) => timeCostInfo),
                },
            };
        }
        await this.database.rentalType.update(updateArgs);
    }
};
RentalTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RentalTypeRepository);
exports.RentalTypeRepository = RentalTypeRepository;
//# sourceMappingURL=rental-type.repository.js.map