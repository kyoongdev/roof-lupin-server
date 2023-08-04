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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const content_category_dto_1 = require("./dto/content-category.dto");
const category_exception_1 = require("./exception/category.exception");
const errorCode_1 = require("./exception/errorCode");
let CategoryRepository = class CategoryRepository {
    constructor(database) {
        this.database = database;
    }
    async findCategory(id) {
        const category = await this.database.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.NOT_FOUND(errorCode_1.CATEGORY_NOT_FOUND));
        }
        return new dto_2.CategoryDTO(category);
    }
    async countCategories(args = {}) {
        return await this.database.category.count(args);
    }
    async findCategories(args = {}) {
        const categories = await this.database.category.findMany(args);
        return categories.map((category) => new dto_2.CategoryDTO(category));
    }
    async findContentCategory(id) {
        const category = await this.database.contentCategory.findUnique({
            where: {
                id,
            },
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
        });
        if (!category) {
            throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.NOT_FOUND(errorCode_1.CONTENT_CATEGORY_NOT_FOUND));
        }
        return new content_category_dto_1.ContentCategoryDTO({
            ...category,
            spaces: category.spaces.map((space) => dto_1.SpaceDTO.generateSpaceDTO(space.space)),
        });
    }
    async countContentCategories(args = {}) {
        return await this.database.contentCategory.count(args);
    }
    async findContentCategories(args = {}, userId) {
        const contentCategories = await this.database.contentCategory.findMany({
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
        });
        return contentCategories.map((contentCategory) => new content_category_dto_1.ContentCategoryDTO({
            ...contentCategory,
            spaces: contentCategory.spaces.map(({ space }) => dto_1.SpaceDTO.generateSpaceDTO(space)),
        }));
    }
    async createCategory(data) {
        const category = await this.database.category.create({
            data,
        });
        return category.id;
    }
    async createContentCategory(data) {
        const { spaces, ...rest } = data;
        const category = await this.database.contentCategory.create({
            data: {
                ...rest,
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
        return category.id;
    }
    async createContentCategorySpace(categoryId, data) {
        await this.database.$transaction(async (prisma) => {
            await prisma.contentCategorySpace.updateMany({
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
            await prisma.contentCategorySpace.create({
                data: {
                    orderNo: data.orderNo,
                    contentCategory: {
                        connect: {
                            id: categoryId,
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
    async updateCategory(id, data) {
        await this.database.category.update({
            where: {
                id,
            },
            data,
        });
    }
    async updateContentCategory(id, data) {
        const { spaces, ...rest } = data;
        await this.database.contentCategory.update({
            where: {
                id,
            },
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
    async updateContentCategorySpace(categoryId, data) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.contentCategorySpace.findUnique({
                where: {
                    contentCategoryId_spaceId: {
                        contentCategoryId: categoryId,
                        spaceId: data.spaceId,
                    },
                },
            });
            if (!isExist) {
                throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.NOT_FOUND(errorCode_1.CONTENT_CATEGORY_SPACE_NOT_FOUND));
            }
            await prisma.contentCategorySpace.updateMany({
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
            await prisma.contentCategorySpace.update({
                where: {
                    contentCategoryId_spaceId: {
                        contentCategoryId: categoryId,
                        spaceId: data.spaceId,
                    },
                },
                data,
            });
        });
    }
    async deleteCategory(id) {
        await this.database.category.delete({
            where: {
                id,
            },
        });
    }
    async deleteContentCategory(id) {
        await this.database.contentCategory.delete({
            where: {
                id,
            },
        });
    }
    async deleteContentCategorySpace(categoryId, spaceId) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.contentCategorySpace.findUnique({
                where: {
                    contentCategoryId_spaceId: {
                        contentCategoryId: categoryId,
                        spaceId,
                    },
                },
            });
            if (!isExist) {
                throw new category_exception_1.CategoryException(errorCode_1.CATEGORY_ERROR_CODE.NOT_FOUND(errorCode_1.CONTENT_CATEGORY_SPACE_NOT_FOUND));
            }
            await prisma.contentCategorySpace.updateMany({
                where: {
                    orderNo: {
                        gt: isExist.orderNo,
                    },
                },
                data: {
                    orderNo: {
                        decrement: 1,
                    },
                },
            });
            await prisma.contentCategorySpace.delete({
                where: {
                    contentCategoryId_spaceId: {
                        contentCategoryId: categoryId,
                        spaceId,
                    },
                },
            });
        });
    }
};
CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map