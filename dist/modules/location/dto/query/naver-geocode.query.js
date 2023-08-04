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
exports.NaverGeocodeQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class NaverGeocodeQuery {
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '주소' } }),
    __metadata("design:type", String)
], NaverGeocodeQuery.prototype, "query", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '중심 위도' } }),
    __metadata("design:type", String)
], NaverGeocodeQuery.prototype, "latitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '중심 경도' } }),
    __metadata("design:type", String)
], NaverGeocodeQuery.prototype, "longitude", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '결과 필터링' } }),
    __metadata("design:type", String)
], NaverGeocodeQuery.prototype, "filter", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '언어' } }),
    __metadata("design:type", String)
], NaverGeocodeQuery.prototype, "language", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '페이지' } }),
    __metadata("design:type", Number)
], NaverGeocodeQuery.prototype, "page", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '페이지 당 개수' } }),
    __metadata("design:type", Number)
], NaverGeocodeQuery.prototype, "count", void 0);
exports.NaverGeocodeQuery = NaverGeocodeQuery;
//# sourceMappingURL=naver-geocode.query.js.map