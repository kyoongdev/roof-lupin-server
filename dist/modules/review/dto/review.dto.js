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
exports.ReviewDTO = void 0;
const client_1 = require("@prisma/client");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../file/dto");
const dto_2 = require("../../user/dto");
const review_answer_dto_1 = require("./review-answer.dto");
class ReviewDTO {
    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.score = props.score;
        this.user = new dto_2.CommonUserDTO(props.user);
        this.images = props.images.map(({ image }) => new dto_1.ImageDTO(image));
        this.isBest = props.isBest;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.reviewAnswers = props.answers.map((answer) => new review_answer_dto_1.ReviewAnswerDTO(answer));
    }
    static async generateQuery(query, spaceId) {
        const includeIds = [];
        if (query.hasPhoto && spaceId) {
            const database = new client_1.PrismaClient();
            const images = await database.spaceReviewImage.groupBy({
                by: ['spaceReviewId'],
                where: {
                    spaceReview: {
                        spaceId,
                    },
                },
            });
            images.forEach(({ spaceReviewId }) => {
                if (!includeIds.includes(spaceReviewId)) {
                    includeIds.push(spaceReviewId);
                }
            });
        }
        return {
            where: {
                ...(query.hasPhoto && {
                    OR: includeIds.map((id) => ({
                        id,
                    })),
                }),
            },
            ...(query.sort && {
                orderBy: {
                    ...(query.sort === 'CREATED_AT' && {
                        createdAt: 'desc',
                    }),
                    ...(query.sort === 'SCORE_HIGH' && {
                        score: 'desc',
                    }),
                    ...(query.sort === 'SCORE_LOW' && {
                        score: 'asc',
                    }),
                },
            }),
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReviewDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], ReviewDTO.prototype, "content", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: 'number' },
    }),
    __metadata("design:type", Number)
], ReviewDTO.prototype, "score", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', isArray: true } }),
    __metadata("design:type", Array)
], ReviewDTO.prototype, "images", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean' } }),
    __metadata("design:type", Boolean)
], ReviewDTO.prototype, "isBest", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.CommonUserDTO } }),
    __metadata("design:type", dto_2.CommonUserDTO)
], ReviewDTO.prototype, "user", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], ReviewDTO.prototype, "createdAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', format: 'date-time' } }),
    __metadata("design:type", Date)
], ReviewDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '예약 id' } }),
    __metadata("design:type", String)
], ReviewDTO.prototype, "reservationId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: review_answer_dto_1.ReviewAnswerDTO, isArray: true, description: '리뷰 답변' } }),
    __metadata("design:type", Array)
], ReviewDTO.prototype, "reviewAnswers", void 0);
exports.ReviewDTO = ReviewDTO;
//# sourceMappingURL=review.dto.js.map