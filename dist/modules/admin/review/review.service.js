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
exports.AdminReviewService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../../database/prisma.service");
const review_repository_1 = require("../../review/review.repository");
let AdminReviewService = class AdminReviewService {
    constructor(reviewRepository, database) {
        this.reviewRepository = reviewRepository;
        this.database = database;
    }
    async findReview(id) {
        return await this.reviewRepository.findReview(id);
    }
    async findPagingReviews(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reviewRepository.countReviews({
            where: args.where,
        });
        const rows = await this.reviewRepository.findReviews({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(rows, { count, paging });
    }
    async setIsBestReview(id, isBest) {
        await this.findReview(id);
        await this.reviewRepository.updateReview(id, {
            isBest,
        });
    }
    async findPagingReviewReports(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.reviewRepository.countReviewReports({
            where: args.where,
        });
        const reports = await this.reviewRepository.findReviewReports({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(reports, { count, paging });
    }
    async updateReviewReportIsProcessed(id, isProcessed) {
        await this.reviewRepository.findReview(id);
        await this.reviewRepository.updateReviewReportIsProcessed(id, isProcessed);
    }
    async deleteReview(id) {
        return await this.reviewRepository.deleteReview(id);
    }
};
AdminReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository, prisma_service_1.PrismaService])
], AdminReviewService);
exports.AdminReviewService = AdminReviewService;
//# sourceMappingURL=review.service.js.map