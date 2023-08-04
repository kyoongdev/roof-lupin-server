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
exports.UpdatePaymentDTO = exports.PayMethod = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
var PayMethod;
(function (PayMethod) {
    PayMethod[PayMethod["PORT_ONE"] = 1] = "PORT_ONE";
    PayMethod[PayMethod["TOSS_PAY"] = 2] = "TOSS_PAY";
    PayMethod[PayMethod["KAKAO_PAY"] = 3] = "KAKAO_PAY";
})(PayMethod = exports.PayMethod || (exports.PayMethod = {}));
class UpdatePaymentDTO {
    constructor(props) {
        if (props) {
            this.totalCost = props.totalCost;
            this.vatCost = props.vatCost;
            this.discountCost = props.discountCost;
            this.originalCost = props.originalCost;
            this.orderId = props.orderId;
            this.orderResultId = props.orderResultId;
            this.payMethod = props.payMethod;
            this.payedAt = props.payedAt;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '결제 비용' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "totalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: 'VAT 금액' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "vatCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "discountCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '할인가가 적용되지 않은 금액' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "originalCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '주문번호' } }),
    __metadata("design:type", String)
], UpdatePaymentDTO.prototype, "orderId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '주문 결과 번호' } }),
    __metadata("design:type", String)
], UpdatePaymentDTO.prototype, "orderResultId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '결제 방식' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "payMethod", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '결제일' } }),
    __metadata("design:type", Date)
], UpdatePaymentDTO.prototype, "payedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '환불 금액' } }),
    __metadata("design:type", Number)
], UpdatePaymentDTO.prototype, "refundCost", void 0);
exports.UpdatePaymentDTO = UpdatePaymentDTO;
//# sourceMappingURL=update-payment.dto.js.map