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
exports.PrepareKakaoPaymentDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class PrepareKakaoPaymentDTO {
    constructor(props) {
        this.nextRedirectAppUrl = props.next_redirect_app_url;
        this.nextRedirectMobileUrl = props.next_redirect_mobile_url;
        this.nextRedirectPcUrl = props.next_redirect_pc_url;
        this.androidAppScheme = props.android_app_scheme;
        this.iosAppScheme = props.ios_app_scheme;
        this.orderId = props.orderId;
        this.orderResultId = props.orderResultId;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', description: '요청한 클라이언트가 모바일 앱일 경우 카카오톡 결제 페이지' },
    }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "nextRedirectAppUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', description: '요청한 클라이언트가 모바일 웹일 경우 카카오톡 결제 페이지' },
    }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "nextRedirectMobileUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', description: '요청한 클라이언트가 PC 웹일 경우 카카오톡 결제 페이지' },
    }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "nextRedirectPcUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'string', description: '카카오페이 결제 화면으로 이동하는 Android 앱 스킴(Scheme)' },
    }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "androidAppScheme", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '카카오페이 결제 화면으로 이동하는 iOS 앱 스킴' } }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "iosAppScheme", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문 ID' } }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "orderId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문 결과 ID' } }),
    __metadata("design:type", String)
], PrepareKakaoPaymentDTO.prototype, "orderResultId", void 0);
exports.PrepareKakaoPaymentDTO = PrepareKakaoPaymentDTO;
//# sourceMappingURL=prepare-kakao-payment.dto.js.map