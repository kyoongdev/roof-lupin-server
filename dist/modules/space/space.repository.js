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
exports.SpaceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const category_1 = require("./dto/category");
const facility_1 = require("./dto/facility");
const hashTag_1 = require("./dto/hashTag");
const refund_1 = require("./dto/refund");
const service_1 = require("./dto/service");
const errorCode_1 = require("./exception/errorCode");
const space_exception_1 = require("./exception/space.exception");
const rental_type_repository_1 = require("./rental-type/rental-type.repository");
let SpaceRepository = class SpaceRepository {
    constructor(database, rentalTypeRepository) {
        this.database = database;
        this.rentalTypeRepository = rentalTypeRepository;
    }
    async findSpaceIds() {
        const spaces = await this.database.space.findMany({
            select: {
                id: true,
                title: true,
                thumbnail: true,
            },
        });
        return spaces.map((space) => new dto_1.SpaceIdsDTO(space));
    }
    async findSpacesWithSQL(sql, userId) {
        const spaces = await this.database.$queryRaw(sql);
        const data = await Promise.all(spaces.map(async (space) => {
            const publicTransportations = await this.database.publicTransportation.findMany({
                where: {
                    spaceId: space.id,
                },
            });
            const rentalType = await this.database.rentalType.findMany({
                where: {
                    spaceId: space.id,
                },
            });
            const categories = await this.database.category.findMany({
                where: {
                    spaceUsageCategories: {
                        some: {
                            spaceId: space.id,
                        },
                    },
                },
            });
            const interests = await this.database.spaceInterest.findMany({
                where: {
                    spaceId: space.id,
                },
            });
            return new dto_1.SpaceDTO({
                ...space,
                isInterested: interests.some((interest) => interest.userId === userId),
                interestCount: interests.length,
                location: {
                    id: space.slId,
                    lat: space.lat,
                    lng: space.lng,
                    roadAddress: space.roadAddress,
                    jibunAddress: space.jibunAddress,
                },
                publicTransportations,
                rentalType,
                categories,
            });
        }));
        return data;
    }
    async findSpace(id, userId) {
        const space = await this.database.space.findUnique({
            where: {
                id,
            },
            include: {
                _count: {
                    select: {
                        reviews: true,
                        spaceQnAs: true,
                    },
                },
                reviews: {
                    include: {
                        answers: {
                            include: {
                                host: true,
                            },
                        },
                        images: {
                            include: {
                                image: true,
                            },
                        },
                        user: true,
                    },
                    skip: 0,
                    take: 3,
                    orderBy: [
                        {
                            isBest: 'desc',
                        },
                        {
                            createdAt: 'desc',
                        },
                    ],
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                cautions: true,
                buildings: {
                    include: {
                        building: true,
                    },
                },
                host: true,
                images: {
                    include: {
                        image: true,
                    },
                },
                location: true,
                publicTransportations: true,
                refundPolicies: {
                    orderBy: {
                        daysBefore: 'asc',
                    },
                },
                services: {
                    include: {
                        service: true,
                    },
                },
                userInterests: true,
                sizes: true,
                openHours: true,
                holidays: true,
            },
        });
        if (!space) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.NOT_FOUND());
        }
        const { cautions, categories, buildings, host, images, publicTransportations, services, userInterests, refundPolicies, openHours, holidays, } = space;
        const bestPhotos = await this.database.spaceReviewImage.findMany({
            where: {
                spaceReview: {
                    spaceId: id,
                    isBest: true,
                },
            },
            include: {
                image: true,
            },
        });
        return new dto_1.SpaceDetailDTO({
            ...space,
            reviewCount: space._count.reviews,
            cautions: cautions.map((caution) => caution),
            categories: categories.map(({ category }) => category),
            buildings: buildings.map(({ building }) => building),
            host,
            images: images.map(({ image }) => image),
            publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
            services: services.map(({ service }) => service),
            refundPolicies,
            isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
            qnaCount: space._count.spaceQnAs,
            averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
            bestPhotos: bestPhotos.map((photo) => ({
                id: photo.image.id,
                url: photo.image.url,
            })),
            openHours,
            holidays,
        });
    }
    async findCommonSpace(id, userId) {
        const space = await this.database.space.findUnique({
            where: {
                id,
            },
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
        });
        if (!space) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.NOT_FOUND());
        }
        space.rentalType;
        return new dto_1.SpaceDTO({
            ...space,
            reviewCount: space.reviews.length,
            location: space.location,
            averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
            isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
            categories: space.categories.map(({ category }) => category),
            reportCount: space.reports.length,
            interestCount: space.userInterests.length,
        });
    }
    async countSpaces(args = {}) {
        return await this.database.space.count(args);
    }
    async countSpacesWithSQL(sql) {
        const count = await this.database.$queryRaw(sql);
        return count.length;
    }
    async findSpaces(args = {}, userId) {
        const spaces = await this.database.space.findMany({
            ...args,
            where: args.where,
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
            orderBy: {
                ...args.orderBy,
            },
        });
        return spaces.map((space) => new dto_1.SpaceDTO({
            ...space,
            rentalType: space.rentalType,
            reviewCount: space.reviews.length,
            location: space.location,
            averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
            isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
            categories: space.categories.map(({ category }) => category),
            reportCount: space.reports.length,
            interestCount: space.userInterests.length,
        }));
    }
    async findRefundPolicyBySpaceId(spaceId) {
        const refundPolicies = await this.database.refundPolicy.findMany({
            where: {
                spaceId,
            },
            orderBy: {
                daysBefore: 'asc',
            },
        });
        return refundPolicies.map((refundPolicy) => new refund_1.RefundPolicyDTO(refundPolicy));
    }
    async createSpace(hostId, data) {
        const { images, refundPolicies, cautions, rentalTypes, location: locationProps, buildings: buildingProps, services: servicesProps, categories: categoryProps, hashTags: hashTagProps, publicTransportations, sizes, openHours, holidays, ...rest } = data;
        data.validateRefundPolicies();
        const minSize = Math.min(...sizes.map((size) => size.size));
        const id = await this.database.$transaction(async (prisma) => {
            const buildings = await this.findOrCreateBuildings(prisma, buildingProps);
            const services = await this.findOrCreateServices(prisma, servicesProps);
            const categories = await this.findOrCreateCategories(prisma, categoryProps);
            const hashTags = await this.findOrCreateHashTags(prisma, hashTagProps);
            const space = await prisma.space.create({
                data: {
                    ...rest,
                    minSize,
                    host: {
                        connect: {
                            id: hostId,
                        },
                    },
                    images: {
                        create: images.map((url) => ({
                            image: {
                                create: {
                                    url,
                                },
                            },
                        })),
                    },
                    refundPolicies: {
                        create: refundPolicies.map((refundPolicy) => refundPolicy),
                    },
                    cautions: {
                        create: cautions.map((caution) => caution),
                    },
                    buildings: {
                        create: buildings.map((building) => ({
                            buildingId: building.id,
                        })),
                    },
                    services: {
                        create: services.map((service) => ({
                            serviceId: service.id,
                        })),
                    },
                    categories: {
                        create: categories.map((category) => ({
                            categoryId: category.id,
                        })),
                    },
                    hashTags: {
                        create: hashTags.map((hashTag) => ({
                            hashTagId: hashTag.id,
                        })),
                    },
                    publicTransportations: {
                        create: publicTransportations.map((publicTransportation) => publicTransportation),
                    },
                    sizes: {
                        create: sizes.map((size) => size),
                    },
                    location: {
                        create: {
                            ...locationProps,
                        },
                    },
                    openHours: {
                        create: openHours.map((openHour) => openHour),
                    },
                    ...(holidays && {
                        holiday: {
                            create: holidays.map((holiday) => holiday),
                        },
                    }),
                },
            });
            await this.rentalTypeRepository.createRentalTypes(prisma, space.id, rentalTypes);
            return space.id;
        });
        return id;
    }
    async updateSpace(spaceId, data) {
        const { images, refundPolicies, cautions, rentalTypes, location: locationProps, buildings: buildingProps, services: servicesProps, categories: categoryProps, hashTags: hashTagProps, publicTransportations, sizes, openHours, holidays, ...rest } = data;
        data.validateRefundPolicies();
        const updateArgs = {
            where: {
                id: spaceId,
            },
            data: {
                ...rest,
            },
        };
        await this.database.$transaction(async (prisma) => {
            if (holidays) {
                await prisma.spaceHoliday.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    holidays: {
                        create: holidays.map((holiday) => holiday),
                    },
                };
            }
            if (openHours) {
                await prisma.openHour.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    openHours: {
                        create: openHours.map((openHour) => openHour),
                    },
                };
            }
            if (images) {
                await prisma.image.deleteMany({
                    where: {
                        spaceImages: {
                            some: {
                                spaceId,
                            },
                        },
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    images: {
                        create: images.map((url) => ({
                            image: {
                                create: {
                                    url,
                                },
                            },
                        })),
                    },
                };
            }
            if (refundPolicies) {
                await prisma.refundPolicy.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    refundPolicies: {
                        create: refundPolicies.map((refundPolicy) => refundPolicy),
                    },
                };
            }
            if (cautions) {
                await prisma.spaceCaution.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    cautions: {
                        create: cautions.map((caution) => caution),
                    },
                };
            }
            if (rentalTypes) {
                await prisma.rentalType.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                await this.rentalTypeRepository.createRentalTypes(prisma, spaceId, rentalTypes);
            }
            if (locationProps) {
                await prisma.spaceLocation.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    location: {
                        create: {
                            ...locationProps,
                        },
                    },
                };
            }
            if (buildingProps) {
                await prisma.spaceBuilding.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                const buildings = await this.findOrCreateBuildings(prisma, buildingProps);
                updateArgs.data = {
                    ...updateArgs.data,
                    buildings: {
                        create: buildings.map((building) => ({
                            buildingId: building.id,
                        })),
                    },
                };
            }
            if (servicesProps) {
                await prisma.spaceService.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                const services = await this.findOrCreateServices(prisma, servicesProps);
                updateArgs.data = {
                    ...updateArgs.data,
                    services: {
                        create: services.map((service) => ({
                            serviceId: service.id,
                        })),
                    },
                };
            }
            if (categoryProps) {
                await prisma.spaceCategory.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                const categories = await this.findOrCreateCategories(prisma, categoryProps);
                updateArgs.data = {
                    ...updateArgs.data,
                    categories: {
                        create: categories.map((category) => ({
                            categoryId: category.id,
                        })),
                    },
                };
            }
            if (hashTagProps) {
                await prisma.spaceHashTag.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                const hashTags = await this.findOrCreateHashTags(prisma, hashTagProps);
                updateArgs.data = {
                    ...updateArgs.data,
                    hashTags: {
                        create: hashTags.map((hashTag) => ({
                            hashTagId: hashTag.id,
                        })),
                    },
                };
            }
            if (publicTransportations) {
                await prisma.publicTransportation.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    publicTransportations: {
                        create: publicTransportations.map((publicTransportation) => publicTransportation),
                    },
                };
            }
            if (sizes) {
                await prisma.spaceSize.deleteMany({
                    where: {
                        spaceId,
                    },
                });
                updateArgs.data = {
                    ...updateArgs.data,
                    sizes: {
                        create: sizes.map((size) => size),
                    },
                };
            }
            await prisma.space.update(updateArgs);
        });
    }
    async updateSpaceOrder(id, orderNo) {
        await this.database.$transaction(async (prisma) => {
            const space = await prisma.space.findUnique({
                where: {
                    id,
                },
            });
            if (space.orderNo) {
                await prisma.space.updateMany({
                    where: {
                        ...(space.orderNo > orderNo
                            ? {
                                AND: [
                                    {
                                        orderNo: {
                                            lt: space.orderNo,
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
                                            gt: space.orderNo,
                                        },
                                    },
                                ],
                            }),
                    },
                    data: {
                        orderNo: {
                            ...(space.orderNo > orderNo
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
            await prisma.space.update({
                where: {
                    id,
                },
                data: {
                    orderNo,
                },
            });
        });
    }
    async deleteSpaceOrder(id) {
        await this.database.space.update({
            where: {
                id,
            },
            data: {
                orderNo: null,
            },
        });
    }
    async deleteSpace(id) {
        await this.database.space.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async hardDeleteSpace(id) {
        await this.database.space.delete({
            where: {
                id,
            },
        });
    }
    async findOrCreateBuildings(prisma, data) {
        return await Promise.all(data.map(async (building) => {
            const isExist = await prisma.building.findFirst({
                where: {
                    name: building.name,
                },
            });
            if (isExist) {
                return new facility_1.BuildingDTO(isExist);
            }
            const newBuilding = await prisma.building.create({
                data: building,
            });
            return new facility_1.BuildingDTO(newBuilding);
        }));
    }
    async findOrCreateServices(prisma, data) {
        return await Promise.all(data.map(async (service) => {
            const isExist = await prisma.service.findFirst({
                where: {
                    name: service.name,
                },
            });
            if (isExist) {
                return new service_1.ServiceDTO(isExist);
            }
            const newService = await prisma.service.create({
                data: service,
            });
            return new service_1.ServiceDTO(newService);
        }));
    }
    async findOrCreateCategories(prisma, data) {
        return await Promise.all(data.map(async (category) => {
            const isExist = await prisma.category.findFirst({
                where: {
                    name: category.name,
                },
            });
            if (isExist) {
                return new category_1.SpaceCategoryDTO(isExist);
            }
            const newCategory = await prisma.category.create({
                data: category,
            });
            return new category_1.SpaceCategoryDTO(newCategory);
        }));
    }
    async findOrCreateHashTags(prisma, data) {
        return await Promise.all(data.map(async (hashTag) => {
            const isExist = await prisma.hashTag.findFirst({
                where: {
                    name: hashTag.name,
                },
            });
            if (isExist) {
                return new hashTag_1.HashTagDTO(isExist);
            }
            const newHashTag = await prisma.hashTag.create({
                data: hashTag,
            });
            return new hashTag_1.HashTagDTO(newHashTag);
        }));
    }
    async createInterest(userId, spaceId) {
        await this.database.spaceInterest.create({
            data: {
                userId,
                spaceId,
            },
        });
    }
    async deleteInterest(userId, spaceId) {
        await this.database.spaceInterest.deleteMany({
            where: {
                userId,
                spaceId,
            },
        });
    }
    async checkIsInterested(userId, spaceId) {
        const interest = await this.database.spaceInterest.findFirst({
            where: {
                userId,
                spaceId,
            },
        });
        return interest ? true : false;
    }
};
SpaceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, rental_type_repository_1.RentalTypeRepository])
], SpaceRepository);
exports.SpaceRepository = SpaceRepository;
//# sourceMappingURL=space.repository.js.map