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
exports.FindReviewsQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("../validation");
class FindReviewsQuery extends cumuco_nestjs_1.PagingDTO {
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '정렬', enum: validation_1.REVIEWS_SORT_KEYS } }),
    __metadata("design:type", Object)
], FindReviewsQuery.prototype, "sort", void 0);
__decorate([
    (0, cumuco_nestjs_1.ToBoolean)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '사진이 있는 리뷰만 가져오기' } }),
    __metadata("design:type", Boolean)
], FindReviewsQuery.prototype, "hasPhoto", void 0);
exports.FindReviewsQuery = FindReviewsQuery;
//# sourceMappingURL=find-reviews.query.js.map