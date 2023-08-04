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
exports.ReviewsSummaryDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class ReviewsSummaryDTO {
    constructor(props) {
        this.averageScore = Number(props.averageScore.toFixed(1));
        this.count = props.count;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '평균 점수' } }),
    __metadata("design:type", Number)
], ReviewsSummaryDTO.prototype, "averageScore", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '리뷰 개수' } }),
    __metadata("design:type", Number)
], ReviewsSummaryDTO.prototype, "count", void 0);
exports.ReviewsSummaryDTO = ReviewsSummaryDTO;
//# sourceMappingURL=reviews-summary.dto.js.map