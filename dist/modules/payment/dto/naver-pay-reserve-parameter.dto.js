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
exports.NaverPayReserveParametersDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const naver_product_item_dto_1 = require("./naver-product-item.dto");
class NaverPayReserveParametersDTO {
    constructor(props) {
        this.merchantPayKey = props.merchantPayKey;
        this.merchantUserKey = props.merchantUserKey;
        this.productName = props.productName;
        this.productCount = props.productCount;
        this.totalPayAmount = props.totalPayAmount;
        this.taxScopeAmount = props.taxScopeAmount;
        this.taxExScopeAmount = props.taxExScopeAmount;
        this.returnUrl = props.returnUrl;
        this.purchaserName = props.purchaserName;
        this.purchaserBirthDay = props.purchaserBirthDay;
        this.productItems = props.productItems.map((item) => new naver_product_item_dto_1.NaverProductItemDTO(item));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '가맹점 결제번호 또는 주문번호' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "merchantPayKey", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '가맹점 사용자 키' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "merchantUserKey", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상품명' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "productName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '상품 수량 ex) A 2개, B 1개 -> 3' } }),
    __metadata("design:type", Number)
], NaverPayReserveParametersDTO.prototype, "productCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '총 결제 금액' } }),
    __metadata("design:type", Number)
], NaverPayReserveParametersDTO.prototype, "totalPayAmount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '과세 대상 금액' } }),
    __metadata("design:type", Number)
], NaverPayReserveParametersDTO.prototype, "taxScopeAmount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '면세 대상 금액' } }),
    __metadata("design:type", Number)
], NaverPayReserveParametersDTO.prototype, "taxExScopeAmount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '결제 인증 결과 전달 URL' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "returnUrl", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '구매자 성명' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "purchaserName", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '구매자 생년월일' } }),
    __metadata("design:type", String)
], NaverPayReserveParametersDTO.prototype, "purchaserBirthDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: naver_product_item_dto_1.NaverProductItemDTO, isArray: true, description: 'productItem 배열' } }),
    __metadata("design:type", Array)
], NaverPayReserveParametersDTO.prototype, "productItems", void 0);
exports.NaverPayReserveParametersDTO = NaverPayReserveParametersDTO;
//# sourceMappingURL=naver-pay-reserve-parameter.dto.js.map