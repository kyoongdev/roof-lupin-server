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
exports.ReviewReportDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../user/dto");
class ReviewReportDTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.isProcessed = props.isProcessed;
        this.createdAt = props.createdAt;
        this.user = new dto_1.CommonUserDTO(props.user);
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '리뷰 신고 id' } }),
    __metadata("design:type", String)
], ReviewReportDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 내용' } }),
    __metadata("design:type", String)
], ReviewReportDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '신고 처리 여부' } }),
    __metadata("design:type", Boolean)
], ReviewReportDTO.prototype, "isProcessed", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '신고 날짜' } }),
    __metadata("design:type", Date)
], ReviewReportDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CommonUserDTO, description: '신고자 정보' } }),
    __metadata("design:type", dto_1.CommonUserDTO)
], ReviewReportDTO.prototype, "user", void 0);
exports.ReviewReportDTO = ReviewReportDTO;
//# sourceMappingURL=review-report.dto.js.map