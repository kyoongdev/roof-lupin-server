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
exports.NaverMetaDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class NaverMetaDTO {
    constructor(props) {
        this.totalCount = props.totalCount;
        this.page = props.page;
        this.count = props.count;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '검색된 총 결과 수' } }),
    __metadata("design:type", Number)
], NaverMetaDTO.prototype, "totalCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: 'page' } }),
    __metadata("design:type", Number)
], NaverMetaDTO.prototype, "page", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '현재 페이지 개수' } }),
    __metadata("design:type", Number)
], NaverMetaDTO.prototype, "count", void 0);
exports.NaverMetaDTO = NaverMetaDTO;
//# sourceMappingURL=meta.dto.js.map