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
exports.CouponDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../category/dto");
const discount_value_validation_1 = require("../validation/discount-value.validation");
class CouponDTO {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.discountType = props.discountType;
        this.discountValue = props.discountValue;
        this.description = props.description;
        this.defaultDueDateStart = props.defaultDueDateStart || null;
        this.defaultDueDay = props.defaultDueDay;
        this.isLupinPay = props.isLupinPay;
        this.categories = props.categories ? props.categories.map((category) => new dto_1.CategoryDTO(category)) : null;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 ID' } }),
    __metadata("design:type", String)
], CouponDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 이름' } }),
    __metadata("design:type", String)
], CouponDTO.prototype, "name", void 0);
__decorate([
    (0, discount_value_validation_1.DiscountTypeResTransform)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 할인 타입', example: discount_value_validation_1.DISCOUNT_TYPE_VALUES.join(',') } }),
    __metadata("design:type", Number)
], CouponDTO.prototype, "discountType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '쿠폰 할인 값' } }),
    __metadata("design:type", Number)
], CouponDTO.prototype, "discountValue", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 설명' } }),
    __metadata("design:type", String)
], CouponDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '루팡페이 쿠폰 여부' } }),
    __metadata("design:type", Boolean)
], CouponDTO.prototype, "isLupinPay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '쿠폰 기본 유효기간 시작 날짜' },
    }),
    __metadata("design:type", Date)
], CouponDTO.prototype, "defaultDueDateStart", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '쿠폰 기본 유효기간' } }),
    __metadata("design:type", Number)
], CouponDTO.prototype, "defaultDueDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CategoryDTO, isArray: true, nullable: true, description: '쿠폰 카테고리' } }),
    __metadata("design:type", Array)
], CouponDTO.prototype, "categories", void 0);
exports.CouponDTO = CouponDTO;
//# sourceMappingURL=coupon.dto.js.map