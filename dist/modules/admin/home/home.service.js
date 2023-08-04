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
exports.AdminHomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const category_repository_1 = require("../../category/category.repository");
const exhibition_repository_1 = require("../../exhibition/exhibition.repository");
const errorCode_1 = require("../../home/exception/errorCode");
const home_exception_1 = require("../../home/exception/home.exception");
const ranking_repository_1 = require("../../ranking/ranking.repository");
const dto_1 = require("../../space/dto");
const home_1 = require("../dto/home");
let AdminHomeService = class AdminHomeService {
    constructor(database, categoryRepository, exhibitionRepository, rankingRepository) {
        this.database = database;
        this.categoryRepository = categoryRepository;
        this.exhibitionRepository = exhibitionRepository;
        this.rankingRepository = rankingRepository;
    }
    async findHomeContent(id) {
        const content = await this.database.homeContents.findUnique({
            where: {
                id,
            },
        });
        if (!content) {
            throw new home_exception_1.HomeException(errorCode_1.HOME_ERROR_CODE.NOT_FOUND(errorCode_1.HOME_CONTENTS_NOT_FOUND));
        }
        return content;
    }
    async findHomeContents() {
        const contents = await this.database.homeContents.findMany({
            include: {
                contentsCategory: {
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
                },
                exhibition: true,
                ranking: {
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
                },
            },
            orderBy: {
                orderNo: 'asc',
            },
        });
        return contents.map((content) => new home_1.AdminHomeContentDTO({
            ...content,
            ...(content.contentsCategory && {
                contentsCategory: {
                    ...content.contentsCategory,
                    spaces: content.contentsCategory.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space)),
                },
            }),
            ...(content.ranking && {
                ranking: {
                    ...content.ranking,
                    spaces: content.ranking.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space)),
                },
            }),
            ...(content.exhibition && {
                exhibition: content.exhibition,
            }),
        }));
    }
    async createHomeContent(data) {
        this.validateMutatingHomeContent(data);
        const content = await this.database.homeContents.create({
            data: {
                ...(data.contentCategoryId && {
                    contentsCategory: {
                        connect: {
                            id: data.contentCategoryId,
                        },
                    },
                }),
                ...(data.exhibitionId && {
                    exhibition: {
                        connect: {
                            id: data.exhibitionId,
                        },
                    },
                }),
                ...(data.rankingId && {
                    ranking: {
                        connect: {
                            id: data.rankingId,
                        },
                    },
                }),
            },
        });
        return content;
    }
    async updateHomeContent(id, data) {
        const isExist = await this.findHomeContent(id);
        this.validateMutatingHomeContent(data);
        await this.database.$transaction(async (prisma) => {
            await prisma.homeContents.updateMany({
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
            await prisma.homeContents.update({
                where: {
                    id,
                },
                data: {
                    orderNo: data.orderNo,
                    ...(data.contentCategoryId && {
                        contentsCategory: {
                            connect: {
                                id: data.contentCategoryId,
                            },
                        },
                    }),
                    ...(data.exhibitionId && {
                        exhibition: {
                            connect: {
                                id: data.exhibitionId,
                            },
                        },
                    }),
                    ...(data.rankingId && {
                        ranking: {
                            connect: {
                                id: data.rankingId,
                            },
                        },
                    }),
                },
            });
        });
    }
    async deleteHomeContent(id) {
        const homeContent = await this.findHomeContent(id);
        await this.database.homeContents.updateMany({
            where: {
                orderNo: {
                    gt: homeContent.orderNo,
                },
            },
            data: {
                orderNo: {
                    decrement: 1,
                },
            },
        });
        await this.database.homeContents.delete({
            where: {
                id,
            },
        });
    }
    async validateMutatingHomeContent(data) {
        const targets = [data.contentCategoryId, data.exhibitionId, data.rankingId];
        if (targets.filter(Boolean).length !== 1) {
            throw new home_exception_1.HomeException(errorCode_1.HOME_ERROR_CODE.BAD_REQUEST(errorCode_1.HOME_AT_LEAST_ONE_TARGET));
        }
        if (data.contentCategoryId) {
            await this.categoryRepository.findContentCategory(data.contentCategoryId);
        }
        if (data.exhibitionId) {
            await this.exhibitionRepository.findExhibition(data.exhibitionId);
        }
        if (data.rankingId) {
            await this.rankingRepository.findRanking(data.rankingId);
        }
    }
};
AdminHomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        category_repository_1.CategoryRepository,
        exhibition_repository_1.ExhibitionRepository,
        ranking_repository_1.RankingRepository])
], AdminHomeService);
exports.AdminHomeService = AdminHomeService;
//# sourceMappingURL=home.service.js.map