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
exports.RefundPolicyDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class RefundPolicyDTO {
    constructor(props) {
        this.id = props.id;
        this.refundRate = props.refundRate;
        this.daysBefore = props.daysBefore;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '환불 정책 id' } }),
    __metadata("design:type", String)
], RefundPolicyDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '환불률' } }),
    __metadata("design:type", Number)
], RefundPolicyDTO.prototype, "refundRate", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: 'n일전 기한' } }),
    __metadata("design:type", Number)
], RefundPolicyDTO.prototype, "daysBefore", void 0);
exports.RefundPolicyDTO = RefundPolicyDTO;
//# sourceMappingURL=refund-policy.dto.js.map