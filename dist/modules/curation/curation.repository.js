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
exports.CurationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const curation_exception_1 = require("./exception/curation.exception");
const errorCode_1 = require("./exception/errorCode");
let CurationRepository = class CurationRepository {
    constructor(database) {
        this.database = database;
    }
    async checkCurationSpace(curationId, spaceId) {
        const curationSpace = await this.database.curationSpace.findUnique({
            where: {
                curationId_spaceId: {
                    curationId,
                    spaceId,
                },
            },
        });
        return curationSpace ? curationSpace : null;
    }
    async findCuration(id) {
        const curation = await this.database.curation.findUnique({
            where: { id },
            include: {
                user: true,
                spaces: {
                    include: {
                        space: {
                            include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                        },
                    },
                    orderBy: {
                        orderNo: 'asc',
                    },
                },
            },
        });
        if (!curation) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.NOT_FOUND(errorCode_1.CURATION_NOT_FOUND));
        }
        return new dto_2.CurationDetailDTO({
            ...curation,
            spaces: curation.spaces.map((space) => ({
                ...dto_1.SpaceDTO.generateSpaceDTO(space.space),
                curationOrderNo: space.orderNo,
            })),
        });
    }
    async findCurations(args = {}) {
        const curations = await this.database.curation.findMany({
            ...args,
            where: args.where,
            include: {
                spaces: {
                    include: {
                        space: {
                            include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                        },
                    },
                    orderBy: {
                        orderNo: 'asc',
                    },
                },
            },
            orderBy: { orderNo: 'asc' },
        });
        return curations.map((curation) => new dto_2.CurationDTO({
            ...curation,
            spaces: curation.spaces.map((space) => {
                return {
                    ...dto_1.SpaceDTO.generateSpaceDTO(space.space),
                    curationOrderNo: space.orderNo,
                };
            }),
        }));
    }
    async countCurations(args = {}) {
        return await this.database.curation.count(args);
    }
    async createCuration(data, userId) {
        const { spaces, ...rest } = data;
        const curation = await this.database.curation.create({
            data: {
                ...rest,
                ...(userId && {
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                }),
                spaces: {
                    create: spaces.map((space) => ({
                        space: {
                            connect: {
                                id: space.spaceId,
                            },
                        },
                        orderNo: space.orderNo,
                    })),
                },
            },
        });
        return curation.id;
    }
    async updateCuration(id, data) {
        const { spaces, ...rest } = data;
        await this.database.curation.update({
            where: { id },
            data: {
                ...rest,
                ...(spaces && {
                    spaces: {
                        deleteMany: {},
                        create: spaces.map((space) => ({
                            space: {
                                connect: {
                                    id: space.spaceId,
                                },
                            },
                            orderNo: space.orderNo,
                        })),
                    },
                }),
            },
        });
    }
    async createCurationSpace(curationId, data) {
        await this.database.$transaction(async (prisma) => {
            await prisma.curationSpace.updateMany({
                where: {
                    orderNo: {
                        gte: data.orderNo,
                    },
                },
                data: {
                    orderNo: {
                        increment: 1,
                    },
                },
            });
            await prisma.curationSpace.create({
                data: {
                    orderNo: data.orderNo,
                    curation: {
                        connect: {
                            id: curationId,
                        },
                    },
                    space: {
                        connect: {
                            id: data.spaceId,
                        },
                    },
                },
            });
        });
    }
    async updateCurationSpace(id, data) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.curationSpace.findUnique({
                where: {
                    curationId_spaceId: {
                        curationId: id,
                        spaceId: data.spaceId,
                    },
                },
            });
            if (!isExist) {
                throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.NOT_FOUND(errorCode_1.CURATION_SPACE_NOT_FOUND));
            }
            await prisma.curationSpace.updateMany({
                where: {
                    ...(isExist.orderNo > data.orderNo
                        ? {
                            AND: [
                                {
                                    orderNo: {
                                        lt: isExist.orderNo,
                                    },
                                },
                                {
                                    orderNo: {
                                        gte: data.orderNo,
                                    },
                                },
                            ],
                        }
                        : {
                            AND: [
                                {
                                    orderNo: {
                                        lte: data.orderNo,
                                    },
                                },
                                {
                                    orderNo: {
                                        gt: isExist.orderNo,
                                    },
                                },
                            ],
                        }),
                },
                data: {
                    orderNo: {
                        ...(isExist.orderNo > data.orderNo
                            ? {
                                increment: 1,
                            }
                            : {
                                decrement: 1,
                            }),
                    },
                },
            });
            await prisma.curationSpace.update({
                where: {
                    curationId_spaceId: {
                        curationId: id,
                        spaceId: data.spaceId,
                    },
                },
                data: {
                    orderNo: data.orderNo,
                },
            });
        });
    }
    async updateCurationOrder(id, orderNo) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.curation.findUnique({
                where: {
                    id,
                },
            });
            if (!isExist) {
                throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.NOT_FOUND(errorCode_1.CURATION_NOT_FOUND));
            }
            await prisma.curation.updateMany({
                where: {
                    ...(isExist.orderNo > orderNo
                        ? {
                            AND: [
                                {
                                    orderNo: {
                                        lt: isExist.orderNo,
                                    },
                                },
                                {
                                    orderNo: {
                                        gte: orderNo,
                                    },
                                },
                            ],
                        }
                        : {
                            AND: [
                                {
                                    orderNo: {
                                        lte: orderNo,
                                    },
                                },
                                {
                                    orderNo: {
                                        gt: isExist.orderNo ?? 0,
                                    },
                                },
                            ],
                        }),
                },
                data: {
                    orderNo: {
                        ...(isExist.orderNo > orderNo
                            ? {
                                increment: 1,
                            }
                            : {
                                decrement: 1,
                            }),
                    },
                },
            });
            await prisma.curation.update({
                where: {
                    id,
                },
                data: {
                    orderNo,
                },
            });
        });
    }
    async deleteCuration(id) {
        const curation = await this.database.curation.findUnique({
            where: { id },
        });
        if (!curation) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.NOT_FOUND(errorCode_1.CURATION_NOT_FOUND));
        }
        await this.database.curation.updateMany({
            where: {
                orderNo: {
                    gt: curation.orderNo,
                },
            },
            data: {
                orderNo: {
                    decrement: 1,
                },
            },
        });
        await this.database.curation.delete({
            where: { id },
        });
    }
    async deleteCurationSpace(curationId, spaceId) {
        const curationSpace = await this.database.curationSpace.findUnique({
            where: {
                curationId_spaceId: {
                    curationId,
                    spaceId,
                },
            },
        });
        if (!curationSpace) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.NOT_FOUND(errorCode_1.CURATION_SPACE_NOT_FOUND));
        }
        await this.database.curationSpace.updateMany({
            where: {
                orderNo: {
                    gt: curationSpace.orderNo,
                },
            },
            data: {
                orderNo: {
                    decrement: 1,
                },
            },
        });
    }
};
CurationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CurationRepository);
exports.CurationRepository = CurationRepository;
//# sourceMappingURL=curation.repository.js.map