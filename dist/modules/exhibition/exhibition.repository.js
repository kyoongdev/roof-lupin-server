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
exports.ExhibitionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("../space/dto");
const dto_2 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const exhibition_exception_1 = require("./exception/exhibition.exception");
let ExhibitionRepository = class ExhibitionRepository {
    constructor(database) {
        this.database = database;
    }
    async findExhibition(id, userId) {
        const exhibition = await this.database.exhibition.findUnique({
            where: {
                id,
            },
            include: {
                images: {
                    include: {
                        image: true,
                    },
                },
                coupons: {
                    include: {
                        coupon: {
                            include: {
                                couponCategories: {
                                    include: {
                                        category: true,
                                    },
                                },
                            },
                        },
                    },
                },
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
        if (!exhibition)
            throw new exhibition_exception_1.ExhibitionException(errorCode_1.EXHIBITION_ERROR_CODE.NOT_FOUND(errorCode_1.EXHIBITION_NOT_FOUND));
        return new dto_2.ExhibitionDetailDTO({
            ...exhibition,
            spaces: exhibition.spaces.map(({ space }) => dto_1.SpaceDTO.generateSpaceDTO(space, userId)),
            coupons: exhibition.coupons.map(({ coupon }) => ({
                ...coupon,
                categories: coupon.couponCategories.map(({ category }) => category),
            })),
            images: exhibition.images.map(({ image }) => image),
        });
    }
    async countExhibitions(args) {
        return this.database.exhibition.count(args);
    }
    async findExhibitions(args) {
        const exhibitions = await this.database.exhibition.findMany({
            ...args,
            where: args.where,
            orderBy: {
                orderNo: 'asc',
            },
        });
        return exhibitions.map((exhibition) => new dto_2.ExhibitionDTO(exhibition));
    }
    async createExhibition(data) {
        const { spaces, couponIds, images, ...rest } = data;
        const exhibition = await this.database.exhibition.create({
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
                coupons: {
                    create: couponIds.map((couponId) => ({
                        coupon: {
                            connect: {
                                id: couponId,
                            },
                        },
                    })),
                },
                images: {
                    create: images.map((image) => ({
                        image: {
                            create: {
                                url: image,
                            },
                        },
                    })),
                },
            },
        });
        return exhibition.id;
    }
    async createExhibitionSpace(exhibitionId, data) {
        await this.database.$transaction(async (prisma) => {
            await prisma.exhibitionSpace.updateMany({
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
            await prisma.exhibitionSpace.create({
                data: {
                    orderNo: data.orderNo,
                    exhibition: {
                        connect: {
                            id: exhibitionId,
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
    async updateExhibition(id, data) {
        const { spaces, images, couponIds, ...rest } = data;
        await this.database.exhibition.update({
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
                ...(couponIds && {
                    coupons: {
                        deleteMany: {},
                        create: couponIds.map((couponId) => ({
                            coupon: {
                                connect: {
                                    id: couponId,
                                },
                            },
                        })),
                    },
                }),
                ...(images && {
                    images: {
                        deleteMany: {},
                        create: images.map((image) => ({
                            image: {
                                create: {
                                    url: image,
                                },
                            },
                        })),
                    },
                }),
            },
        });
    }
    async updateExhibitionOrder(id, data) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.exhibition.findUnique({
                where: {
                    id,
                },
            });
            if (!isExist)
                throw new exhibition_exception_1.ExhibitionException(errorCode_1.EXHIBITION_ERROR_CODE.NOT_FOUND(errorCode_1.EXHIBITION_NOT_FOUND));
            if (isExist.orderNo) {
                await prisma.exhibition.updateMany({
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
            }
            await prisma.exhibition.update({
                where: {
                    id,
                },
                data: {
                    orderNo: data.orderNo,
                },
            });
        });
    }
    async updateExhibitionSpace(id, data) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.exhibitionSpace.findUnique({
                where: {
                    exhibitionId_spaceId: {
                        exhibitionId: id,
                        spaceId: data.spaceId,
                    },
                },
            });
            if (!isExist)
                throw new exhibition_exception_1.ExhibitionException(errorCode_1.EXHIBITION_ERROR_CODE.NOT_FOUND(errorCode_1.EXHIBITION_SPACE_NOT_FOUND));
            await prisma.exhibitionSpace.updateMany({
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
            await prisma.exhibitionSpace.update({
                where: {
                    exhibitionId_spaceId: {
                        exhibitionId: id,
                        spaceId: data.spaceId,
                    },
                },
                data,
            });
        });
    }
    async deleteExhibition(id) {
        await this.database.image.deleteMany({
            where: {
                exhibitionImages: {
                    some: {
                        exhibitionId: id,
                    },
                },
            },
        });
        await this.database.exhibition.delete({
            where: {
                id,
            },
        });
    }
    async deleteExhibitionOrder(id) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.exhibition.findUnique({
                where: {
                    id,
                },
            });
            if (!isExist)
                throw new exhibition_exception_1.ExhibitionException(errorCode_1.EXHIBITION_ERROR_CODE.NOT_FOUND(errorCode_1.EXHIBITION_NOT_FOUND));
            await prisma.exhibition.updateMany({
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
            await this.database.exhibition.update({
                where: {
                    id,
                },
                data: {
                    orderNo: null,
                },
            });
        });
    }
    async deleteExhibitionSpace(id, spaceId) {
        await this.database.$transaction(async (prisma) => {
            const isExist = await prisma.exhibitionSpace.findUnique({
                where: {
                    exhibitionId_spaceId: {
                        exhibitionId: id,
                        spaceId,
                    },
                },
            });
            if (!isExist)
                throw new exhibition_exception_1.ExhibitionException(errorCode_1.EXHIBITION_ERROR_CODE.NOT_FOUND(errorCode_1.EXHIBITION_SPACE_NOT_FOUND));
            await prisma.exhibitionSpace.updateMany({
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
            await prisma.exhibitionSpace.delete({
                where: {
                    exhibitionId_spaceId: {
                        exhibitionId: id,
                        spaceId,
                    },
                },
            });
        });
    }
};
ExhibitionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExhibitionRepository);
exports.ExhibitionRepository = ExhibitionRepository;
//# sourceMappingURL=exhibition.repository.js.map