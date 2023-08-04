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
exports.UpdateReservationDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
const validation_2 = require("./validation");
class UpdateReservationDTO {
    constructor(props) {
        if (props) {
            this.year = props.year;
            this.month = props.month;
            this.day = props.day;
            this.userName = props.userName;
            this.userPhoneNumber = props.userPhoneNumber;
            this.startAt = props.startAt;
            this.endAt = props.endAt;
            this.totalCost = props.totalCost;
            this.discountCost = props.discountCost;
            this.originalCost = props.originalCost;
            this.isApproved = props.isApproved;
            this.isCanceled = props.isCanceled;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 연도' } }),
    __metadata("design:type", String)
], UpdateReservationDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 월' } }),
    __metadata("design:type", String)
], UpdateReservationDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '예약 일' } }),
    __metadata("design:type", String)
], UpdateReservationDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '대표 이용자 이름' } }),
    __metadata("design:type", String)
], UpdateReservationDTO.prototype, "userName", void 0);
__decorate([
    (0, validation_1.PhoneNumberValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '대표 이용자 전화번호' } }),
    __metadata("design:type", String)
], UpdateReservationDTO.prototype, "userPhoneNumber", void 0);
__decorate([
    (0, validation_2.TimeValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '예약 시작 시간 (0 ~ 24)' } }),
    __metadata("design:type", Number)
], UpdateReservationDTO.prototype, "startAt", void 0);
__decorate([
    (0, validation_2.TimeValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '예약 종료 시간 (0 ~ 24)' } }),
    __metadata("design:type", Number)
], UpdateReservationDTO.prototype, "endAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '예약 비용' } }),
    __metadata("design:type", Number)
], UpdateReservationDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } }),
    __metadata("design:type", Number)
], UpdateReservationDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '할인제외 예약 비용' } }),
    __metadata("design:type", Number)
], UpdateReservationDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } }),
    __metadata("design:type", Boolean)
], UpdateReservationDTO.prototype, "isApproved", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '취소 여부' } }),
    __metadata("design:type", Boolean)
], UpdateReservationDTO.prototype, "isCanceled", void 0);
exports.UpdateReservationDTO = UpdateReservationDTO;
//# sourceMappingURL=update-reservation.dto.js.map