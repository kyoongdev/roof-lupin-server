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
exports.UpdateRefundPolicyDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateRefundPolicyDTO {
    constructor(props) {
        if (props) {
            this.refundRate = props.refundRate;
            this.daysBefore = props.daysBefore;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '환불률', nullable: true } }),
    __metadata("design:type", Number)
], UpdateRefundPolicyDTO.prototype, "refundRate", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: 'n일전 기한', nullable: true } }),
    __metadata("design:type", Number)
], UpdateRefundPolicyDTO.prototype, "daysBefore", void 0);
exports.UpdateRefundPolicyDTO = UpdateRefundPolicyDTO;
//# sourceMappingURL=update-refund-policy.dto.js.map