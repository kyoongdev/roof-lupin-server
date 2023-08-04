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
exports.NaverProductItemDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class NaverProductItemDTO {
    constructor(props) {
        this.categoryType = props.categoryType;
        this.categoryId = props.categoryId;
        this.name = props.name;
        this.uid = props.uid;
        this.payReferrer = props.payReferrer;
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.sellerId = props.sellerId;
        this.count = props.count;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '결제 상품 유형' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "categoryType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상품 카테고리 ID' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "categoryId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상품명' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '상품 식별키' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "uid", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '유입경로' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "payReferrer", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '시작일' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "startDate", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '종료일' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "endDate", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '판매자 식별키' } }),
    __metadata("design:type", String)
], NaverProductItemDTO.prototype, "sellerId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '상품 개수' } }),
    __metadata("design:type", Number)
], NaverProductItemDTO.prototype, "count", void 0);
exports.NaverProductItemDTO = NaverProductItemDTO;
//# sourceMappingURL=naver-product-item.dto.js.map