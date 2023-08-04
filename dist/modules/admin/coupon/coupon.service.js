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
exports.AdminCouponService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const fcm_1 = require("../../../event/fcm");
const category_repository_1 = require("../../category/category.repository");
const coupon_repository_1 = require("../../coupon/coupon.repository");
const admin_exception_1 = require("../exception/admin.exception");
const errorCode_1 = require("../exception/errorCode");
const coupon_repository_2 = require("./coupon.repository");
let AdminCouponService = class AdminCouponService {
    constructor(couponRepository, adminCouponRepository, categoryRepository, fcmEvent) {
        this.couponRepository = couponRepository;
        this.adminCouponRepository = adminCouponRepository;
        this.categoryRepository = categoryRepository;
        this.fcmEvent = fcmEvent;
    }
    async findCoupon(id) {
        return await this.adminCouponRepository.findCoupon(id);
    }
    async findPagingCoupons(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.adminCouponRepository.countCoupons({
            where: args.where,
        });
        const coupons = await this.adminCouponRepository.findCoupons({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(coupons, { count, paging });
    }
    async findUserCoupon(id) {
        return await this.adminCouponRepository.findUserCoupon(id);
    }
    async findPagingUserCoupons(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.adminCouponRepository.countUserCoupons({
            where: args.where,
        });
        const coupons = await this.adminCouponRepository.findUserCoupons({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(coupons, { count, paging });
    }
    async createCoupon(data) {
        if (data.categoryIds) {
            await Promise.all(data.categoryIds.map(async (id) => await this.categoryRepository.findCategory(id)));
        }
        return await this.couponRepository.createCoupon(data);
    }
    async createUserCoupon(couponId, data) {
        const isExist = await this.couponRepository.checkUserCoupon(couponId, data.userId);
        if (isExist) {
            throw new admin_exception_1.AdminException(errorCode_1.ADMIN_ERROR_CODE.CONFLICT(errorCode_1.ADMIN_USER_COUPON_ALREADY_EXISTS));
        }
        const userCoupon = await this.couponRepository.createUserCoupon(couponId, data);
        this.fcmEvent.createCouponDurationAlarm({
            userId: data.userId,
            dueDate: userCoupon.usageDateEndAt,
            jobId: `${data.userId}_${userCoupon.id}`,
            nickname: userCoupon.user.nickname,
        });
        return userCoupon.id;
    }
    async updateCoupon(id, data) {
        await this.findCoupon(id);
        if (data.categoryIds) {
            await Promise.all(data.categoryIds.map(async (id) => await this.categoryRepository.findCategory(id)));
        }
        await this.couponRepository.updateCoupon(id, data);
    }
    async updateUserCoupon(id, data) {
        await this.couponRepository.findUserCoupon(id);
        await this.couponRepository.updateUserCoupon(id, data);
    }
    async deleteCoupon(id) {
        await this.findCoupon(id);
        await this.couponRepository.deleteCoupon(id);
    }
    async deleteUserCoupon(id) {
        await this.couponRepository.findUserCoupon(id);
        await this.couponRepository.deleteUserCoupon(id);
    }
};
AdminCouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coupon_repository_1.CouponRepository,
        coupon_repository_2.AdminCouponRepository,
        category_repository_1.CategoryRepository,
        fcm_1.FCMEvent])
], AdminCouponService);
exports.AdminCouponService = AdminCouponService;
//# sourceMappingURL=coupon.service.js.map