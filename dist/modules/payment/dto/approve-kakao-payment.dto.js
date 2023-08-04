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
exports.ApproveKakaoPaymentDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class ApproveKakaoPaymentDTO {
    constructor(props) {
        if (props) {
            this.orderId = props.orderId;
            this.orderResultId = props.orderResultId;
            this.pg_token = props.pg_token;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문번호' } }),
    __metadata("design:type", String)
], ApproveKakaoPaymentDTO.prototype, "orderId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문결과번호' } }),
    __metadata("design:type", String)
], ApproveKakaoPaymentDTO.prototype, "orderResultId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '결제승인 토큰' } }),
    __metadata("design:type", String)
], ApproveKakaoPaymentDTO.prototype, "pg_token", void 0);
exports.ApproveKakaoPaymentDTO = ApproveKakaoPaymentDTO;
//# sourceMappingURL=approve-kakao-payment.dto.js.map