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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../database/prisma.service");
const fcm_1 = require("../../event/fcm");
const coupon_repository_1 = require("./coupon.repository");
let CouponService = class CouponService {
    constructor(couponRepository, fcmEvent, database) {
        this.couponRepository = couponRepository;
        this.fcmEvent = fcmEvent;
        this.database = database;
    }
    async findUserCoupon(id) {
        return await this.couponRepository.findUserCoupon(id);
    }
    async findPagingUserCoupons(paging, userId) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.couponRepository.countUserCoupons({
            where: {
                userId,
                deletedAt: null,
            },
        });
        const coupons = await this.couponRepository.findUserCoupons({
            where: {
                userId,
                deletedAt: null,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(coupons, { count, paging });
    }
    async registerCouponByCode(user, data) {
        const coupon = await this.couponRepository.findCouponByCode(data.code);
        const userCoupon = await this.couponRepository.findUserCouponByCode(data.code);
        if (userCoupon) {
        }
        const now = new Date();
        const usageDateStartAt = new Date(coupon.defaultDueDateStart) || new Date(now);
        const usageDateEndAt = new Date(now.setDate(now.getDate() + coupon.defaultDueDay));
        const userCouponId = await this.couponRepository.createUserCoupon(coupon.id, {
            userId: user.id,
            usageDateStartAt,
            usageDateEndAt,
        });
        if (user && user.isAlarmAccepted && user.pushToken) {
            this.fcmEvent.createCouponDurationAlarm({
                dueDate: usageDateEndAt,
                jobId: `${user.id}_${userCouponId}`,
                userId: user.id,
                nickname: user.nickname,
            });
        }
        return userCouponId;
    }
};
CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [coupon_repository_1.CouponRepository,
        fcm_1.FCMEvent,
        prisma_service_1.PrismaService])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map