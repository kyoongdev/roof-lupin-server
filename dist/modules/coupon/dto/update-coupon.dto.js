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
exports.UpdateCouponDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const discount_value_validation_1 = require("../validation/discount-value.validation");
class UpdateCouponDTO {
    constructor(props) {
        if (props) {
            this.name = props.name;
            this.code = props.code;
            this.discountType = props.discountType;
            this.discountValue = props.discountValue;
            this.description = props.description;
            this.isLupinPay = props.isLupinPay;
            this.categoryIds = props.categoryIds;
            this.defaultDueDateStart = props.defaultDueDateStart;
            this.defaultDueDay = props.defaultDueDay;
            this.link = props.link;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 이름' } }),
    __metadata("design:type", String)
], UpdateCouponDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 코드' } }),
    __metadata("design:type", String)
], UpdateCouponDTO.prototype, "code", void 0);
__decorate([
    (0, discount_value_validation_1.DiscountTypeReqDecorator)(true),
    __metadata("design:type", Number)
], UpdateCouponDTO.prototype, "discountType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 할인 값' } }),
    __metadata("design:type", Number)
], UpdateCouponDTO.prototype, "discountValue", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 설명' } }),
    __metadata("design:type", String)
], UpdateCouponDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '루팡페이 쿠폰 여부' } }),
    __metadata("design:type", Boolean)
], UpdateCouponDTO.prototype, "isLupinPay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '쿠폰 기본 유효기간 시작 날짜' },
    }),
    __metadata("design:type", Date)
], UpdateCouponDTO.prototype, "defaultDueDateStart", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 기본 유효기간' } }),
    __metadata("design:type", Number)
], UpdateCouponDTO.prototype, "defaultDueDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '카테고리 id 배열' } }),
    __metadata("design:type", Array)
], UpdateCouponDTO.prototype, "categoryIds", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 링크' } }),
    __metadata("design:type", String)
], UpdateCouponDTO.prototype, "link", void 0);
exports.UpdateCouponDTO = UpdateCouponDTO;
//# sourceMappingURL=update-coupon.dto.js.map