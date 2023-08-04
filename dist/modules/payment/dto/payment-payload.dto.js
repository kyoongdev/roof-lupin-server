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
exports.PaymentPayloadDTO = void 0;
const config_1 = require("@nestjs/config");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const escrow_product_dto_1 = require("./escrow-product.dto");
const product_dto_1 = require("./product.dto");
class PaymentPayloadDTO {
    constructor(props) {
        this.amount = props.amount;
        this.orderId = props.orderId;
        this.orderName = props.orderName;
        this.successUrl = props.successUrl;
        this.failUrl = props.failUrl;
        this.customerEmail = props.customerEmail;
        this.customerName = props.customerName;
        this.appScheme = props.appScheme;
        this.taxFreeAmount = props.taxFreeAmount;
        this.taxExemptionAmount = props.taxExemptionAmount;
        this.cultureExpense = props.cultureExpense;
        this.useEscrow = props.useEscrow;
        this.escrowProducts = props.escrowProducts?.map((product) => new escrow_product_dto_1.EscrowProductDTO(product));
        this.customerMobilePhone = props.customerMobilePhone;
        this.mobileCarrier = props.mobileCarrier;
        this.products = props.products?.map((product) => new product_dto_1.ProductDTO(product));
    }
    static generatePaymentPayload(space, orderId, rentalTypes, props) {
        const config = new config_1.ConfigService();
        const orderName = `[${space.title}] ${rentalTypes.length > 1 ? `${rentalTypes[0].name} 외 ${rentalTypes.length - 1}건` : rentalTypes[0].name}`;
        return new PaymentPayloadDTO({
            amount: props.totalCost,
            orderId,
            orderName,
            successUrl: config.get('PAYMENT_SUCCESS_URL'),
            failUrl: config.get('PAYMENT_FAIL_URL'),
        });
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '가격' } }),
    __metadata("design:type", Number)
], PaymentPayloadDTO.prototype, "amount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문 구분 ID' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "orderId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주문명' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "orderName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '성공 url' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "successUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '실패 url' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "failUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '고객 이메일' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "customerEmail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '고객 이름' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "customerName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: {
            type: 'string',
            nullable: true,
            description: '페이북/ISP앱에서 상점 앱으로 돌아올 때 사용되는 상점의 앱 스킴',
        },
    }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "appScheme", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '면세 금액' } }),
    __metadata("design:type", Number)
], PaymentPayloadDTO.prototype, "taxFreeAmount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '과세를 제외한 결제금액 (컵 보증금 등)' } }),
    __metadata("design:type", Number)
], PaymentPayloadDTO.prototype, "taxExemptionAmount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '문화비 지출여부' } }),
    __metadata("design:type", Boolean)
], PaymentPayloadDTO.prototype, "cultureExpense", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '에스크로 사용 여부' } }),
    __metadata("design:type", Boolean)
], PaymentPayloadDTO.prototype, "useEscrow", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: {
            type: escrow_product_dto_1.EscrowProductDTO,
            isArray: true,
            nullable: true,
            description: '상품 정보 객체 배열(가상계좌,계좌이체에서 에스크로 사용 시 필수)',
        },
    }),
    __metadata("design:type", Array)
], PaymentPayloadDTO.prototype, "escrowProducts", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '고객의 휴대폰 번호, 가상계좌 입금 안내' } }),
    __metadata("design:type", String)
], PaymentPayloadDTO.prototype, "customerMobilePhone", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '휴대폰 결제창 통신사' } }),
    __metadata("design:type", Array)
], PaymentPayloadDTO.prototype, "mobileCarrier", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: product_dto_1.ProductDTO, isArray: true, nullable: true, description: '상품 정보 객체' } }),
    __metadata("design:type", Array)
], PaymentPayloadDTO.prototype, "products", void 0);
exports.PaymentPayloadDTO = PaymentPayloadDTO;
//# sourceMappingURL=payment-payload.dto.js.map