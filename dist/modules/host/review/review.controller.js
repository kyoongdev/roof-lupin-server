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
exports.HostReviewController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const review_dto_1 = require("../../review/dto/review.dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const review_service_1 = require("./review.service");
let HostReviewController = class HostReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReview(reviewId) {
        await this.reviewService.findReview(reviewId);
    }
    async getReviewsBySpaceID(paging, spaceId, user) {
        return await this.reviewService.findPagingReviews(paging, {
            where: {
                spaceId,
                space: {
                    hostId: user.id,
                },
            },
        });
    }
    async getReviews(paging, user) {
        return await this.reviewService.findPagingReviews(paging, {
            where: {
                space: {
                    hostId: user.id,
                },
            },
        });
    }
    async setBestReview(reviewId) {
        await this.reviewService.setIsBestReview(reviewId, true);
    }
    async deleteBestReview(reviewId) {
        await this.reviewService.setIsBestReview(reviewId, false);
    }
};
__decorate([
    (0, common_1.Get)(':reviewId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '리뷰 상세 조회',
            summary: '리뷰 상세 조회 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'reviewId',
            type: 'string',
            required: true,
            description: '리뷰 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
    }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostReviewController.prototype, "getReview", null);
__decorate([
    (0, common_1.Get)(':spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '리뷰 목록 조회',
            summary: '공간 리뷰 목록 조회 - 호스트만 사용 가능합니다.',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            required: true,
            description: '공간 아이디',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Param)('spaceId')),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, String, Object]),
    __metadata("design:returntype", Promise)
], HostReviewController.prototype, "getReviewsBySpaceID", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '전체 목록 조회',
            summary: '전체 리뷰 목록 조회 - 호스트만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], HostReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Post)(':reviewId/best'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[호스트]리뷰 베스트 설정',
            summary: '리뷰를 베스트로 설정합니다. 호스트만 사용 가능합니다.',
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
], HostReviewController.prototype, "setBestReview", null);
__decorate([
    (0, common_1.Delete)(':reviewId/best'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '[호스트] 리뷰 베스트 제외',
            summary: '리뷰를 베스트에서 제외합니다. 호스트만 사용 가능합니다.',
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
], HostReviewController.prototype, "deleteBestReview", null);
HostReviewController = __decorate([
    (0, utils_1.ApiController)('reviews', '[호스트] 리뷰 관리'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    __metadata("design:paramtypes", [review_service_1.HostReviewService])
], HostReviewController);
exports.HostReviewController = HostReviewController;
//# sourceMappingURL=review.controller.js.map