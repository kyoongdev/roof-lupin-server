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
exports.PortOnePreparePaymentDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class PortOnePreparePaymentDTO {
    constructor(props) {
        this.merchant_uid = props.merchant_uid;
        this.amount = props.amount;
        this.name = props.name;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '가맹점 주문번호' } }),
    __metadata("design:type", String)
], PortOnePreparePaymentDTO.prototype, "merchant_uid", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상품 이름' } }),
    __metadata("design:type", String)
], PortOnePreparePaymentDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '결제금액' } }),
    __metadata("design:type", Number)
], PortOnePreparePaymentDTO.prototype, "amount", void 0);
exports.PortOnePreparePaymentDTO = PortOnePreparePaymentDTO;
//# sourceMappingURL=prepare-port-one-payment.dto.js.map