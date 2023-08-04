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
exports.CreateTaxReturnDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../../../utils/validation");
class CreateTaxReturnDTO {
    constructor(props) {
        if (props) {
            this.year = props.year;
            this.month = props.month;
            this.cost = props.cost;
            this.receiptUrl = props.receiptUrl;
            this.hostId = props.hostId;
        }
    }
}
__decorate([
    (0, validation_1.WordLengthValidation)(4),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: ' 세금계산서 신고 연도 ' } }),
    __metadata("design:type", String)
], CreateTaxReturnDTO.prototype, "year", void 0);
__decorate([
    (0, validation_1.WordLengthValidation)(2, 1),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: ' 세금계산서 신고 월' } }),
    __metadata("design:type", String)
], CreateTaxReturnDTO.prototype, "month", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '신고 금액' } }),
    __metadata("design:type", Number)
], CreateTaxReturnDTO.prototype, "cost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '영수증 url' } }),
    __metadata("design:type", String)
], CreateTaxReturnDTO.prototype, "receiptUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '호스트 id' } }),
    __metadata("design:type", String)
], CreateTaxReturnDTO.prototype, "hostId", void 0);
exports.CreateTaxReturnDTO = CreateTaxReturnDTO;
//# sourceMappingURL=create-tax-return.dto.js.map