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
exports.CouponRepository = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const coupon_exception_1 = require("./exception/coupon.exception");
const errorCode_1 = require("./exception/errorCode");
let CouponRepository = class CouponRepository {
    constructor(database) {
        this.database = database;
    }
    async findCoupon(id) {
        const coupon = await this.database.coupon.findUnique({
            where: {
                id,
            },
            include: {
                couponCategories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!coupon) {
            throw new coupon_exception_1.CouponException(errorCode_1.COUPON_ERROR_CODE.NOT_FOUND(errorCode_1.COUPON_NOT_FOUND));
        }
        const { couponCategories, ...rest } = coupon;
        return new dto_1.CouponDTO({
            ...rest,
            categories: couponCategories.map(({ category }) => category),
        });
    }
    async findCouponByCode(code) {
        const coupon = await this.database.coupon.findUnique({
            where: {
                code,
            },
            include: {
                couponCategories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!coupon) {
            throw new coupon_exception_1.CouponException(errorCode_1.COUPON_ERROR_CODE.NOT_FOUND(errorCode_1.COUPON_NOT_FOUND));
        }
        const { couponCategories, ...rest } = coupon;
        return new dto_1.CouponDTO({
            ...rest,
            categories: couponCategories.map(({ category }) => category),
        });
    }
    async countCoupons(args = {}) {
        return this.database.coupon.count(args);
    }
    async findCoupons(args = {}) {
        const coupons = await this.database.coupon.findMany({
            ...args,
            include: {
                couponCategories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return coupons.map((coupon) => {
            const { couponCategories, ...rest } = coupon;
            return new dto_1.CouponDTO({
                ...rest,
                categories: couponCategories.map(({ category }) => category),
            });
        });
    }
    async createCoupon(data) {
        const code = await this.checkCouponCode();
        const { categoryIds, ...rest } = data;
        const coupon = await this.database.coupon.create({
            data: {
                ...rest,
                code: rest.code || code,
                ...(categoryIds && {
                    couponCategories: {
                        create: categoryIds.map((categoryId) => ({
                            category: {
                                connect: {
                                    id: categoryId,
                                },
                            },
                        })),
                    },
                }),
            },
        });
        return coupon.id;
    }
    async updateCoupon(id, data) {
        const { categoryIds, ...rest } = data;
        const updateArgs = {
            where: {
                id,
            },
            data: {
                ...rest,
            },
        };
        if (categoryIds) {
            updateArgs.data = {
                ...updateArgs.data,
                couponCategories: {
                    deleteMany: {},
                    create: categoryIds.map((categoryId) => ({
                        category: {
                            connect: {
                                id: categoryId,
                            },
                        },
                    })),
                },
            };
        }
        const coupon = await this.database.coupon.update(updateArgs);
        return coupon.id;
    }
    async deleteCoupon(id) {
        const coupon = await this.database.coupon.delete({
            where: {
                id,
            },
        });
        return coupon.id;
    }
    async checkUserCoupon(couponId, userId) {
        const userCoupon = await this.database.userCoupon.findFirst({
            where: {
                couponId,
                userId,
            },
        });
        return userCoupon;
    }
    async findUserCoupon(id) {
        const userCoupon = await this.database.userCoupon.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
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
        });
        if (!userCoupon) {
            throw new coupon_exception_1.CouponException(errorCode_1.COUPON_ERROR_CODE.NOT_FOUND(errorCode_1.USER_COUPON_NOT_FOUND));
        }
        return new dto_1.UserCouponDTO({
            ...userCoupon,
            isUsed: !!userCoupon.reservationId,
            coupon: {
                ...userCoupon.coupon,
                categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
            },
        });
    }
    async findUserCouponByCode(code) {
        const userCoupon = await this.database.userCoupon.findFirst({
            where: {
                coupon: {
                    code,
                },
            },
            include: {
                user: true,
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
        });
        if (!userCoupon) {
            throw new coupon_exception_1.CouponException(errorCode_1.COUPON_ERROR_CODE.NOT_FOUND(errorCode_1.USER_COUPON_NOT_FOUND));
        }
        return new dto_1.UserCouponDTO({
            ...userCoupon,
            isUsed: !!userCoupon.reservationId,
            coupon: {
                ...userCoupon.coupon,
                categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
            },
        });
    }
    async checkUserCouponByCode(code) {
        const userCoupon = await this.database.userCoupon.findFirst({
            where: {
                coupon: {
                    code,
                },
            },
            include: {
                user: true,
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
        });
        if (!userCoupon) {
            return null;
        }
        return new dto_1.UserCouponDTO({
            ...userCoupon,
            isUsed: !!userCoupon.reservationId,
            coupon: {
                ...userCoupon.coupon,
                categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
            },
        });
    }
    async countUserCoupons(args = {}) {
        return this.database.userCoupon.count(args);
    }
    async findUserCoupons(args = {}) {
        const userCoupons = await this.database.userCoupon.findMany({
            ...args,
            include: {
                user: true,
                coupon: {
                    include: {
                        couponCategories: {
                            include: { category: true },
                        },
                    },
                },
            },
        });
        return userCoupons.map((userCoupon) => {
            return new dto_1.UserCouponDTO({
                ...userCoupon,
                isUsed: !!userCoupon.reservationId,
                coupon: {
                    ...userCoupon.coupon,
                    categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
                },
            });
        });
    }
    async createUserCoupon(couponId, data) {
        const { userId, ...rest } = data;
        await this.findCoupon(couponId);
        const userCoupon = await this.database.userCoupon.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                coupon: {
                    connect: {
                        id: couponId,
                    },
                },
                ...rest,
            },
            include: {
                user: true,
            },
        });
        return userCoupon;
    }
    async updateUserCoupon(id, data) {
        await this.database.userCoupon.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteUserCoupon(id) {
        await this.database.userCoupon.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async hardDeleteUserCoupon(id) {
        await this.database.userCoupon.delete({
            where: {
                id,
            },
        });
    }
    async restoreUserCoupon(id) {
        await this.database.userCoupon.update({
            where: {
                id,
            },
            data: {
                deletedAt: null,
            },
        });
    }
    async checkCouponCode() {
        let isExist = true;
        while (isExist) {
            const code = (0, nanoid_1.nanoid)(10);
            const coupon = await this.database.coupon.findUnique({
                where: {
                    code,
                },
            });
            if (!coupon) {
                isExist = false;
                return code;
            }
        }
    }
};
CouponRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponRepository);
exports.CouponRepository = CouponRepository;
//# sourceMappingURL=coupon.repository.js.map