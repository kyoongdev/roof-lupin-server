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
exports.RefundPaymentDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class RefundPaymentDTO {
    constructor(props) {
        if (props) {
            this.reservationId = props.reservationId;
            this.merchant_uid = props.merchant_uid;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 id' } }),
    __metadata("design:type", String)
], RefundPaymentDTO.prototype, "reservationId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '주문번호 (포트원) ' } }),
    __metadata("design:type", String)
], RefundPaymentDTO.prototype, "merchant_uid", void 0);
exports.RefundPaymentDTO = RefundPaymentDTO;
//# sourceMappingURL=refund-payment.dto.js.map