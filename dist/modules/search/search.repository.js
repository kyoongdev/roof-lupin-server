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
exports.SearchRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const search_exception_1 = require("./exception/search.exception");
let SearchRepository = class SearchRepository {
    constructor(database) {
        this.database = database;
    }
    async findSearchRecord(id) {
        const searchRecord = await this.database.searchRecord.findUnique({
            where: {
                id,
            },
        });
        if (!searchRecord) {
            throw new search_exception_1.SearchException(errorCode_1.SEARCH_ERROR_CODE.NOT_FOUND(errorCode_1.SEARCH_RECORD_NOT_FOUND));
        }
        return new dto_1.SearchRecordDTO(searchRecord);
    }
    async findSearchRecords(args = {}) {
        const searchRecords = await this.database.searchRecord.findMany({
            ...args,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return searchRecords.map((searchRecord) => new dto_1.SearchRecordDTO(searchRecord));
    }
    async findSearchRecommend(id) {
        const searchRecommend = await this.database.searchRecommend.findUnique({
            where: {
                id,
            },
        });
        if (!searchRecommend) {
            throw new search_exception_1.SearchException(errorCode_1.SEARCH_ERROR_CODE.NOT_FOUND(errorCode_1.SEARCH_RECOMMEND_NOT_FOUND));
        }
        return new dto_1.SearchRecommendDTO(searchRecommend);
    }
    async countSearchRecommends(args = {}) {
        return await this.database.searchRecommend.count(args);
    }
    async findSearchRecommends(args = {}) {
        const searchRecommends = await this.database.searchRecommend.findMany({
            ...args,
        });
        return searchRecommends.map((searchRecommend) => new dto_1.SearchRecommendDTO(searchRecommend));
    }
    async createSearchRecord(userId, data) {
        const isExist = await this.database.searchRecord.findFirst({
            where: {
                userId,
                content: data.content,
            },
        });
        if (!isExist) {
            const searchRecord = await this.database.searchRecord.create({
                data: {
                    ...data,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            return searchRecord.id;
        }
        return isExist.id;
    }
    async deleteSearchRecord(id, userId) {
        await this.database.searchRecord.delete({
            where: {
                id,
            },
        });
    }
    async deleteAllSearchRecords(userId) {
        await this.database.searchRecord.deleteMany({
            where: {
                userId,
            },
        });
    }
    async createSearchRecommend(data) {
        const searchRecommend = await this.database.searchRecommend.create({
            data,
        });
        return searchRecommend.id;
    }
    async updateSearchRecommend(id, data) {
        await this.database.searchRecommend.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteSearchRecommend(id) {
        await this.database.searchRecommend.delete({
            where: {
                id,
            },
        });
    }
    async countRecentSpaces(args = {}) {
        const count = await this.database.recentSpace.count(args);
        return count;
    }
    async createRecentSpace(userId, spaceId) {
        const isExist = await this.database.recentSpace.findFirst({
            where: {
                userId,
                spaceId,
            },
        });
        const count = await this.countRecentSpaces({
            where: {
                userId,
            },
        });
        if (count === 10) {
            const target = await this.database.recentSpace.findFirst({
                where: {
                    userId,
                },
                orderBy: {
                    viewedAt: 'asc',
                },
            });
            await this.database.recentSpace.delete({
                where: {
                    userId_spaceId: {
                        spaceId: target.spaceId,
                        userId: target.userId,
                    },
                },
            });
        }
        if (isExist) {
            await this.database.recentSpace.update({
                where: {
                    userId_spaceId: {
                        spaceId,
                        userId,
                    },
                },
                data: {
                    viewedAt: new Date(),
                },
            });
        }
        else {
            await this.database.recentSpace.create({
                data: {
                    space: {
                        connect: {
                            id: spaceId,
                        },
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    viewedAt: new Date(),
                },
            });
        }
    }
};
SearchRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchRepository);
exports.SearchRepository = SearchRepository;
//# sourceMappingURL=search.repository.js.map