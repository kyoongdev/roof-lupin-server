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
exports.UpdateSettlementDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateSettlementDTO {
    constructor(props) {
        if (props) {
            this.year = props.year;
            this.month = props.month;
            this.day = props.day;
            this.settlementCost = props.settlementCost;
            this.totalCost = props.totalCost;
            this.vatCost = props.vatCost;
            this.discountCost = props.discountCost;
            this.originalCost = props.originalCost;
            this.reservationIds = props.reservationIds;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '정산 연도' } }),
    __metadata("design:type", String)
], UpdateSettlementDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '정산 월' } }),
    __metadata("design:type", String)
], UpdateSettlementDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '정산 일' } }),
    __metadata("design:type", String)
], UpdateSettlementDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '정산 금액' } }),
    __metadata("design:type", Number)
], UpdateSettlementDTO.prototype, "settlementCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '총 결제 금액' } }),
    __metadata("design:type", Number)
], UpdateSettlementDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: 'VAT 금액' } }),
    __metadata("design:type", Number)
], UpdateSettlementDTO.prototype, "vatCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } }),
    __metadata("design:type", Number)
], UpdateSettlementDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '총액 - 할인가가 적용되지 않은 금액' } }),
    __metadata("design:type", Number)
], UpdateSettlementDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '예약 ids' } }),
    __metadata("design:type", Array)
], UpdateSettlementDTO.prototype, "reservationIds", void 0);
exports.UpdateSettlementDTO = UpdateSettlementDTO;
//# sourceMappingURL=update-settlement.dto.js.map