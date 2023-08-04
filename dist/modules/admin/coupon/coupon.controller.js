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
exports.AdminCouponController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../coupon/dto");
const create_user_coupon_dto_1 = require("../../coupon/dto/create-user-coupon.dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const coupon_1 = require("../dto/coupon");
const query_1 = require("../dto/query");
const coupon_service_1 = require("./coupon.service");
let AdminCouponController = class AdminCouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    async getCoupon(id) {
        return await this.couponService.findCoupon(id);
    }
    async getCoupons(paging, query) {
        return await this.couponService.findPagingCoupons(paging, query.generateQuery());
    }
    async getUserCoupon(id) {
        return await this.couponService.findUserCoupon(id);
    }
    async getUserCoupons(paging, query) {
        return await this.couponService.findPagingUserCoupons(paging, query.generateQuery());
    }
    async createCoupon(body) {
        return await this.couponService.createCoupon(body);
    }
    async createUserCoupon(id, body) {
        return await this.couponService.createUserCoupon(id, body);
    }
    async updateCoupon(id, body) {
        return await this.couponService.updateCoupon(id, body);
    }
    async updateUserCoupon(id, body) {
        return await this.couponService.updateUserCoupon(id, body);
    }
    async deleteCoupon(id) {
        return await this.couponService.deleteCoupon(id);
    }
    async deleteUserCoupon(id) {
        return await this.couponService.deleteUserCoupon(id);
    }
};
__decorate([
    (0, common_1.Get)(':couponId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 상세 조회',
            summary: '쿠폰 상세 조회 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: coupon_1.AdminCouponDTO,
    }),
    __param(0, (0, common_1.Param)('couponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "getCoupon", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 목록 조회',
            summary: '쿠폰 목록 조회 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: coupon_1.AdminCouponDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.AdminFindCouponsQuery]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "getCoupons", null);
__decorate([
    (0, common_1.Get)('users/:userCouponId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '사용자 쿠폰 조회',
            summary: '사용자 쿠폰 조회 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: coupon_1.UserAdminCouponDTO,
    }),
    __param(0, (0, common_1.Param)('userCouponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "getUserCoupon", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '사용자 쿠폰 목록 조회',
            summary: '사용자 쿠폰 목록 조회 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: coupon_1.UserAdminCouponDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.AdminFindUserCouponsQuery]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "getUserCoupons", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 생성',
            summary: '쿠폰 생성 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCouponDTO]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Post)(':couponId/users'),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 쿠폰 생성',
            summary: '유저 쿠폰 생성 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Param)('couponId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_coupon_dto_1.CreateUserCouponDTO]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "createUserCoupon", null);
__decorate([
    (0, common_1.Patch)(':couponId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 수정',
            summary: '쿠폰 수정 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('couponId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCouponDTO]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "updateCoupon", null);
__decorate([
    (0, common_1.Patch)('users/:userCouponId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 쿠폰 수정',
            summary: '유저 쿠폰 수정 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('userCouponId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserCouponDTO]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "updateUserCoupon", null);
__decorate([
    (0, common_1.Delete)(':couponId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '쿠폰 수정',
            summary: '쿠폰 수정 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('couponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "deleteCoupon", null);
__decorate([
    (0, common_1.Delete)('users/:userCouponId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 쿠폰 수정',
            summary: '유저 쿠폰 수정 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('userCouponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCouponController.prototype, "deleteUserCoupon", null);
AdminCouponController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('coupons', '[관리자] 쿠폰 관리'),
    __metadata("design:paramtypes", [coupon_service_1.AdminCouponService])
], AdminCouponController);
exports.AdminCouponController = AdminCouponController;
//# sourceMappingURL=coupon.controller.js.map