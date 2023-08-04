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
exports.UserAdminCouponDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../../user/dto");
const admin_coupon_dto_1 = require("./admin-coupon.dto");
class UserAdminCouponDTO {
    constructor(props) {
        this.id = props.id;
        this.usageDateStartAt = props.usageDateStartAt;
        this.usageDateEndAt = props.usageDateEndAt;
        this.isUsed = props.isUsed;
        this.reservationId = props.reservationId ?? null;
        this.createdAt = props.createdAt;
        this.user = new dto_1.CommonUserDTO(props.user);
        this.coupon = new admin_coupon_dto_1.AdminCouponDTO(props.coupon);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 쿠폰 id' } }),
    __metadata("design:type", String)
], UserAdminCouponDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 사용 시작일' } }),
    __metadata("design:type", Date)
], UserAdminCouponDTO.prototype, "usageDateStartAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 사용 종료일' } }),
    __metadata("design:type", Date)
], UserAdminCouponDTO.prototype, "usageDateEndAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '쿠폰 사용 여부' } }),
    __metadata("design:type", Boolean)
], UserAdminCouponDTO.prototype, "isUsed", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 생성일' } }),
    __metadata("design:type", Date)
], UserAdminCouponDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 id' } }),
    __metadata("design:type", String)
], UserAdminCouponDTO.prototype, "reservationId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, description: '유저 정보' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], UserAdminCouponDTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: admin_coupon_dto_1.AdminCouponDTO, description: '쿠폰 정보' } }),
    __metadata("design:type", admin_coupon_dto_1.AdminCouponDTO)
], UserAdminCouponDTO.prototype, "coupon", void 0);
exports.UserAdminCouponDTO = UserAdminCouponDTO;
//# sourceMappingURL=admin-user-coupon.dto.js.map