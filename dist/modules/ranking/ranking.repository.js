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
exports.RankingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const ranking_exception_1 = require("./exception/ranking.exception");
let RankingRepository = class RankingRepository {
    constructor(database) {
        this.database = database;
    }
    async findRankingIds() {
        const id = await this.database.ranking.findMany({
            select: {
                id: true,
            },
        });
        return new dto_2.RankingIdsDTO({ ids: id.map((id) => id.id) });
    }
    async findRanking(id, args = {}) {
        const ranking = await this.database.ranking.findUnique({
            where: {
                id,
            },
            include: {
                spaces: {
                    ...args,
                    include: {
                        space: {
                            include: {
                                location: true,
                                reviews: true,
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
                    orderBy: {
                        orderNo: 'asc',
                    },
                },
            },
        });
        if (!ranking) {
            throw new ranking_exception_1.RankingException(errorCode_1.RANKING_ERROR_CODE.NOT_FOUND(errorCode_1.RANKING_NOT_FOUND));
        }
        return new dto_2.RankingDTO({
            ...ranking,
            spaces: ranking.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space)),
        });
    }
    async countRankings(args = {}) {
        return await this.database.ranking.count(args);
    }
    async countRankingSpaces(rankingId) {
        return await this.database.rankingSpaces.count({
            where: {
                rankingId,
            },
        });
    }
    async findRankings(args = {}) {
        const rankings = await this.database.ranking.findMany({
            ...args,
            where: args.where,
            include: {
                spaces: {
                    include: {
                        space: {
                            include: {
                                location: true,
                                reviews: true,
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
                    orderBy: {
                        orderNo: 'asc',
                    },
                },
            },
        });
        return rankings.map((ranking) => new dto_2.RankingDTO({
            ...ranking,
            spaces: ranking.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space)),
        }));
    }
    async createRanking(data) {
        const { spaces, ...rest } = data;
        const ranking = await this.database.ranking.create({
            data: {
                ...rest,
                spaces: {
                    create: spaces.map((space) => ({
                        orderNo: space.orderNo,
                        space: {
                            connect: {
                                id: space.spaceId,
                            },
                        },
                    })),
                },
            },
        });
        return ranking.id;
    }
    async createRankingSpace(rankingId, data) {
        await this.database.$transaction(async (prisma) => {
            await prisma.rankingSpaces.updateMany({
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
            await prisma.rankingSpaces.create({
                data: {
                    orderNo: data.orderNo,
                    ranking: {
                        connect: {
                            id: rankingId,
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
    async updateRankingSpace(rankingId, data) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.rankingSpaces.findUnique({
                where: {
                    spaceId_rankingId: {
                        rankingId,
                        spaceId: data.spaceId,
                    },
                },
            });
            if (!isExist)
                throw new ranking_exception_1.RankingException(errorCode_1.RANKING_ERROR_CODE.NOT_FOUND(errorCode_1.RANKING_SPACE_NOT_FOUND));
            await prisma.rankingSpaces.updateMany({
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
            await prisma.rankingSpaces.update({
                where: {
                    spaceId_rankingId: {
                        rankingId,
                        spaceId: data.spaceId,
                    },
                },
                data,
            });
        });
    }
    async updateRanking(id, data) {
        const { spaces, ...rest } = data;
        await this.database.ranking.update({
            where: {
                id,
            },
            data: {
                ...rest,
                ...(spaces && {
                    spaces: {
                        deleteMany: {},
                        create: spaces.map((space) => ({
                            orderNo: space.orderNo,
                            space: {
                                connect: {
                                    id: space.spaceId,
                                },
                            },
                        })),
                    },
                }),
            },
        });
    }
    async deleteRanking(id) {
        await this.database.ranking.delete({
            where: {
                id,
            },
        });
    }
    async deleteRankingSpace(rankingId, spaceId) {
        await this.database.$transaction(async (prisma) => {
            const rankingSpace = await prisma.rankingSpaces.findUnique({
                where: {
                    spaceId_rankingId: {
                        rankingId,
                        spaceId,
                    },
                },
            });
            if (!rankingSpace)
                throw new ranking_exception_1.RankingException(errorCode_1.RANKING_ERROR_CODE.NOT_FOUND(errorCode_1.RANKING_SPACE_NOT_FOUND));
            await prisma.rankingSpaces.updateMany({
                where: {
                    orderNo: {
                        gt: rankingSpace.orderNo,
                    },
                },
                data: {
                    orderNo: {
                        decrement: 1,
                    },
                },
            });
            await prisma.rankingSpaces.delete({
                where: {
                    spaceId_rankingId: {
                        rankingId,
                        spaceId,
                    },
                },
            });
        });
    }
};
RankingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RankingRepository);
exports.RankingRepository = RankingRepository;
//# sourceMappingURL=ranking.repository.js.map