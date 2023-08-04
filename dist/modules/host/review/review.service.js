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
exports.HostReviewService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const review_repository_1 = require("../../review/review.repository");
let HostReviewService = class HostReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async findReview(id) {
        return await this.reviewRepository.findReview(id);
    }
    async findPagingReviews(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reviewRepository.countReviews({
            where: {
                ...args.where,
            },
        });
        const reviews = await this.reviewRepository.findReviews({
            where: {
                ...args.where,
            },
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reviews, { count, paging });
    }
    async setIsBestReview(id, isBest) {
        await this.findReview(id);
        await this.reviewRepository.updateReview(id, {
            isBest,
        });
    }
};
HostReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository])
], HostReviewService);
exports.HostReviewService = HostReviewService;
//# sourceMappingURL=review.service.js.map