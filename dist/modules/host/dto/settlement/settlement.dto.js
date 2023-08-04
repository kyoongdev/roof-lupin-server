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
exports.SettlementDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class SettlementDTO {
    constructor(props) {
        this.id = props.id;
        this.year = props.year;
        this.month = props.month;
        this.day = props.day;
        this.settlementCost = props.settlementCost;
        this.totalCost = props.totalCost;
        this.vatCost = props.vatCost;
        this.discountCost = props.discountCost;
        this.originalCost = props.originalCost;
        this.isPayed = props.isPayed;
    }
    static generateQuery(query) {
        return {
            where: {
                ...(query.year && {
                    year: query.year,
                }),
                ...(query.month && {
                    month: query.month,
                }),
                ...(query.day && {
                    day: query.day,
                }),
            },
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '정산 Id' } }),
    __metadata("design:type", String)
], SettlementDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '정산 연도' } }),
    __metadata("design:type", String)
], SettlementDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '정산 월' } }),
    __metadata("design:type", String)
], SettlementDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '정산 일' } }),
    __metadata("design:type", String)
], SettlementDTO.prototype, "day", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '최종 정산 금액' } }),
    __metadata("design:type", Number)
], SettlementDTO.prototype, "settlementCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '최종 매출 금액' } }),
    __metadata("design:type", Number)
], SettlementDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: 'VAT 금액' } }),
    __metadata("design:type", Number)
], SettlementDTO.prototype, "vatCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '할인 금액' } }),
    __metadata("design:type", Number)
], SettlementDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '총액 -> 할인가가 적용되지 않은 금액' } }),
    __metadata("design:type", Number)
], SettlementDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '결제 여부' } }),
    __metadata("design:type", Boolean)
], SettlementDTO.prototype, "isPayed", void 0);
exports.SettlementDTO = SettlementDTO;
//# sourceMappingURL=settlement.dto.js.map