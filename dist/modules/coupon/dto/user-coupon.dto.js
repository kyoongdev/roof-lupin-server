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
exports.UserCouponDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../user/dto");
const coupon_dto_1 = require("./coupon.dto");
class UserCouponDTO {
    constructor(props) {
        this.id = props.id;
        this.usageDateStartAt = props.usageDateStartAt;
        this.usageDateEndAt = props.usageDateEndAt;
        this.reservationId = props.reservationId ?? null;
        this.createdAt = props.createdAt;
        this.user = new dto_1.CommonUserDTO(props.user);
        this.coupon = new coupon_dto_1.CouponDTO(props.coupon);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 쿠폰 id' } }),
    __metadata("design:type", String)
], UserCouponDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 사용 시작일' } }),
    __metadata("design:type", Date)
], UserCouponDTO.prototype, "usageDateStartAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 사용 종료일' } }),
    __metadata("design:type", Date)
], UserCouponDTO.prototype, "usageDateEndAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'date', description: '쿠폰 생성일' } }),
    __metadata("design:type", Date)
], UserCouponDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 id' } }),
    __metadata("design:type", String)
], UserCouponDTO.prototype, "reservationId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, description: '유저 정보' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], UserCouponDTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: coupon_dto_1.CouponDTO, description: '쿠폰 정보' } }),
    __metadata("design:type", coupon_dto_1.CouponDTO)
], UserCouponDTO.prototype, "coupon", void 0);
exports.UserCouponDTO = UserCouponDTO;
//# sourceMappingURL=user-coupon.dto.js.map