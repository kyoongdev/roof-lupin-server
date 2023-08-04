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
exports.BaseReservationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class BaseReservationDTO {
    constructor(props) {
        this.id = props.id;
        this.year = props.year;
        this.month = props.month;
        this.day = props.day;
        this.code = props.code;
        this.totalCost = props.totalCost;
        this.vatCost = props.vatCost;
        this.discountCost = props.discountCost;
        this.originalCost = props.originalCost;
        this.isCanceled = props.isCanceled;
        this.payedAt = props.payedAt;
        this.userCount = props.userCount;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 아이디' } }),
    __metadata("design:type", String)
], BaseReservationDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 년도' } }),
    __metadata("design:type", String)
], BaseReservationDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 월' } }),
    __metadata("design:type", String)
], BaseReservationDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 일' } }),
    __metadata("design:type", String)
], BaseReservationDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 코드' } }),
    __metadata("design:type", String)
], BaseReservationDTO.prototype, "code", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '결제 금액 (originalCost - discountCost)' } }),
    __metadata("design:type", Number)
], BaseReservationDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '유저 수' } }),
    __metadata("design:type", Number)
], BaseReservationDTO.prototype, "userCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '취소여부' } }),
    __metadata("design:type", Boolean)
], BaseReservationDTO.prototype, "isCanceled", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: 'VAT 금액' } }),
    __metadata("design:type", Number)
], BaseReservationDTO.prototype, "vatCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '할인금액' } }),
    __metadata("design:type", Number)
], BaseReservationDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '총액 - 할인가가 적용되지 않은 금액' } }),
    __metadata("design:type", Number)
], BaseReservationDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '생성 날짜' } }),
    __metadata("design:type", Date)
], BaseReservationDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', description: '수정 날짜' } }),
    __metadata("design:type", Date)
], BaseReservationDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '결제 날짜' } }),
    __metadata("design:type", Date)
], BaseReservationDTO.prototype, "payedAt", void 0);
exports.BaseReservationDTO = BaseReservationDTO;
//# sourceMappingURL=base-reservation.dto.js.map