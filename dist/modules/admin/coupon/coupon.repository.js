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
exports.AdminCouponRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const coupon_exception_1 = require("../../coupon/exception/coupon.exception");
const errorCode_1 = require("../../coupon/exception/errorCode");
const coupon_1 = require("../dto/coupon");
let AdminCouponRepository = class AdminCouponRepository {
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
        return new coupon_1.AdminCouponDTO({
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
        return new coupon_1.AdminCouponDTO({
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
            return new coupon_1.AdminCouponDTO({
                ...rest,
                categories: couponCategories.map(({ category }) => category),
            });
        });
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
        return new coupon_1.UserAdminCouponDTO({
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
        return new coupon_1.UserAdminCouponDTO({
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
            return new coupon_1.UserAdminCouponDTO({
                ...userCoupon,
                isUsed: !!userCoupon.reservationId,
                coupon: {
                    ...userCoupon.coupon,
                    categories: userCoupon.coupon.couponCategories.map(({ category }) => category),
                },
            });
        });
    }
};
AdminCouponRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCouponRepository);
exports.AdminCouponRepository = AdminCouponRepository;
//# sourceMappingURL=coupon.repository.js.map