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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReviewController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../review/dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const find_reviews_query_1 = require("../dto/query/review/find-reviews.query");
const review_service_1 = require("./review.service");
let AdminReviewController = class AdminReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReview(reviewId) {
        return await this.reviewService.findReview(reviewId);
    }
    async getReviews(paging, query) {
        return await this.reviewService.findPagingReviews(paging, query.generateQuery());
    }
    async getReviewReports(paging) {
        return await this.reviewService.findPagingReviewReports(paging);
    }
    async setBestReview(reviewId) {
        await this.reviewService.setIsBestReview(reviewId, true);
    }
    async processReviewReport(reportId) {
        await this.reviewService.updateReviewReportIsProcessed(reportId, true);
    }
    async unProcessReviewReport(reportId) {
        await this.reviewService.updateReviewReportIsProcessed(reportId, false);
    }
    async deleteBestReview(reviewId) {
        await this.reviewService.setIsBestReview(reviewId, false);
    }
    async deleteReview(id) {
        await this.reviewService.deleteReview(id);
    }
};
__decorate([
    (0, common_1.Get)(':reviewId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자]리뷰 조회',
            summary: '리뷰를 조회합니다. 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'reviewId',
            description: '리뷰 id',
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDTO,
    }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "getReview", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 조회',
            summary: '공간 리뷰를 조회합니다. 관리자만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReviewDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, find_reviews_query_1.AdminFindReviewsQuery]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자] 리뷰 신고 조회',
            summary: '리뷰 신고를 조회합니다. 관리자만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReviewReportDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "getReviewReports", null);
__decorate([
    (0, common_1.Post)(':reviewId/best'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자]리뷰 베스트 설정',
            summary: '리뷰를 베스트로 설정합니다. 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'reviewId',
            description: '리뷰 id',
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "setBestReview", null);
__decorate([
    (0, common_1.Post)('reports/:reportId/process'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자] 리뷰 신고 처리',
            summary: '리뷰 신고를 처리합니다. 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "processReviewReport", null);
__decorate([
    (0, common_1.Delete)('reports/:reportId/process'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자] 리뷰 신고 미완료 처리',
            summary: '리뷰 신고를 미완료 처리합니다. 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "unProcessReviewReport", null);
__decorate([
    (0, common_1.Delete)(':reviewId/best'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자] 리뷰 베스트 제외',
            summary: '리뷰를 베스트에서 제외합니다. 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'reviewId',
            description: '리뷰 id',
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "deleteBestReview", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[관리자]리뷰 삭제',
            summary: '리뷰를 삭제합니다. 관리자만 사용 가능합니다.',
        },
        params: {
            name: 'id',
            description: '리뷰 id',
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminReviewController.prototype, "deleteReview", null);
AdminReviewController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('reviews', '[관리자] 리뷰 관리'),
    __metadata("design:paramtypes", [review_service_1.AdminReviewService])
], AdminReviewController);
exports.AdminReviewController = AdminReviewController;
//# sourceMappingURL=review.controller.js.map