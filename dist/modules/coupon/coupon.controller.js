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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const coupon_service_1 = require("./coupon.service");
const dto_1 = require("./dto");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    async getMyCoupon(user, id) {
        return await this.couponService.findUserCoupon(id);
    }
    async getMyCoupons(user, paging) {
        return await this.couponService.findPagingUserCoupons(paging, user.id);
    }
    async registerCouponByCode(user, body) {
        return await this.couponService.registerCouponByCode(user, body);
    }
};
__decorate([
    (0, common_1.Get)('users/:userCouponId/detail'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '사용자 쿠폰 조회',
            summary: '사용자 쿠폰 조회 - 유저만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UserCouponDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Param)('userCouponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getMyCoupon", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '사용자 쿠폰 목록 조회',
            summary: '사용자 쿠폰 목록 조회 - 유저만 사용 가능',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.UserCouponDTO,
        isPaging: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getMyCoupons", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 등록',
            summary: '쿠폰 등록 - 유저만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RegisterCouponByCodeDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "registerCouponByCode", null);
CouponController = __decorate([
    (0, utils_1.ApiController)('coupons', '쿠폰'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=coupon.controller.js.map