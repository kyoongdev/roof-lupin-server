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
exports.CreateReviewDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const validation_1 = require("./validation");
class CreateReviewDTO {
    constructor(props) {
        if (props) {
            this.content = props.content;
            this.images = props.images;
            this.score = props.score;
            this.spaceId = props.spaceId;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '리뷰 내용' } }),
    __metadata("design:type", String)
], CreateReviewDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true, description: '이미지 url' } }),
    __metadata("design:type", Array)
], CreateReviewDTO.prototype, "images", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '별점' } }),
    (0, validation_1.ScoreValidation)({ message: '별점은 0~5 사이의 정수만 가능합니다.' }),
    __metadata("design:type", Number)
], CreateReviewDTO.prototype, "score", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 아이디' } }),
    __metadata("design:type", String)
], CreateReviewDTO.prototype, "spaceId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 아이디' } }),
    __metadata("design:type", String)
], CreateReviewDTO.prototype, "reservationId", void 0);
exports.CreateReviewDTO = CreateReviewDTO;
//# sourceMappingURL=create-review.dto.js.map