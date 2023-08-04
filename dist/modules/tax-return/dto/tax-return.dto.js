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
exports.TaxReturnDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../host/dto");
class TaxReturnDTO {
    constructor(props) {
        this.id = props.id;
        this.year = props.year;
        this.month = props.month;
        this.cost = props.cost;
        this.receiptUrl = props.receiptUrl;
        this.submittedAt = props.submittedAt;
        this.host = new dto_1.HostDTO(props.host);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: ' 세금계산서 신고 id' } }),
    __metadata("design:type", String)
], TaxReturnDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: ' 세금계산서 신고 연도 ' } }),
    __metadata("design:type", String)
], TaxReturnDTO.prototype, "year", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: ' 세금계산서 신고 월' } }),
    __metadata("design:type", String)
], TaxReturnDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '신고 금액' } }),
    __metadata("design:type", Number)
], TaxReturnDTO.prototype, "cost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '영수증 url' } }),
    __metadata("design:type", String)
], TaxReturnDTO.prototype, "receiptUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, format: 'date-format', description: '신고일' } }),
    __metadata("design:type", Date)
], TaxReturnDTO.prototype, "submittedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.HostDTO, description: '호스트 정보' } }),
    __metadata("design:type", dto_1.HostDTO)
], TaxReturnDTO.prototype, "host", void 0);
exports.TaxReturnDTO = TaxReturnDTO;
//# sourceMappingURL=tax-return.dto.js.map