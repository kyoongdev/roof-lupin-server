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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const create_review_dto_1 = require("./dto/create-review.dto");
const query_1 = require("./dto/query");
const review_dto_1 = require("./dto/review.dto");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReviewSummary(spaceId) {
        return await this.reviewService.getReviewSummary(spaceId);
    }
    async getPagingSpaceReviews(spaceId, paging, query) {
        const args = await review_dto_1.ReviewDTO.generateQuery(query, spaceId);
        return await this.reviewService.findPagingReviews(paging, {
            where: {
                spaceId,
                ...args.where,
            },
            orderBy: args.orderBy,
        });
    }
    async getSpaceReviews(spaceId) {
        return await this.reviewService.findReviews({
            where: {
                spaceId,
            },
        });
    }
    async getSpaceBestReviews(spaceId) {
        return await this.reviewService.findReviews({
            where: {
                spaceId,
                isBest: true,
            },
        });
    }
    async getMyReviews(user) {
        return await this.reviewService.findReviews({
            where: {
                userId: user.id,
            },
        });
    }
    async getMyReviewsPaging(paging, user) {
        return await this.reviewService.findPagingReviews(paging, {
            where: {
                userId: user.id,
            },
        });
    }
    async getReview(reviewId) {
        return await this.reviewService.findReview(reviewId);
    }
    async createReview(body, user) {
        return await this.reviewService.createReview(body, user.id);
    }
    async createReviewReport(id, user, body) {
        return await this.reviewService.createReviewReport(id, user.id, body);
    }
    async updateReviewReport(reportId, user, body) {
        await this.reviewService.updateReviewReport(reportId, user.id, body);
    }
    async updateReview(body, reviewId, user) {
        await this.reviewService.updateReview(reviewId, user.id, body);
    }
    async deleteReview(reviewId, user) {
        await this.reviewService.deleteReview(reviewId, user.id);
    }
    async deleteReviewReport(reportId, user) {
        await this.reviewService.deleteReviewReport(reportId, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':spaceId/summary'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간의 리뷰 요약',
            summary: '공간의 리뷰 요약을 불러옵니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.ReviewsSummaryDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewSummary", null);
__decorate([
    (0, common_1.Get)(':spaceId/paging'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간의 리뷰 목록',
            summary: '공간의 리뷰 목록을 불러옵니다.',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isPaging: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cumuco_nestjs_1.PagingDTO,
        query_1.FindReviewsQuery]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getPagingSpaceReviews", null);
__decorate([
    (0, common_1.Get)(':spaceId/list'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공강의 리뷰 목록',
            summary: '공간의 리뷰 목록을 불러옵니다.',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getSpaceReviews", null);
__decorate([
    (0, common_1.Get)(':spaceId/best'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공강의 베스트 리뷰 목록',
            summary: '공간의 베스트 리뷰 목록을 불러옵니다.',
        },
        params: {
            name: 'spaceId',
            type: 'string',
            description: '공간 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getSpaceBestReviews", null);
__decorate([
    (0, common_1.Get)('me/list'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내가 작성한 리뷰 목록',
            summary: '내가 작성한 리뷰 목록을 불러옵니다. 유저만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
        isArray: true,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getMyReviews", null);
__decorate([
    (0, common_1.Get)('me/paging'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내가 작성한 리뷰 목록',
            summary: '내가 작성한 리뷰 목록을 불러옵니다. 유저만 사용이 가능합니다.',
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
], ReviewController.prototype, "getMyReviewsPaging", null);
__decorate([
    (0, common_1.Get)(':reviewId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '리뷰 자세히 불러오기',
            summary: '리뷰 자세히 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: review_dto_1.ReviewDTO,
    }),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReview", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 생성',
            summary: '공간 리뷰를 생성합니다. 유저만 사용이 가능합니다.',
        },
        body: {
            type: create_review_dto_1.CreateReviewDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDTO, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, common_1.Post)(':reviewId/report'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 신고',
            summary: '공간 리뷰를 신고합니다. 유저만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.CreateReviewReportDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReviewReport", null);
__decorate([
    (0, common_1.Patch)('report/:reportId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 신고 수정',
            summary: '공간 리뷰 신고를 수정. 리뷰 신고자만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.UpdateReviewReportDTO]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReviewReport", null);
__decorate([
    (0, common_1.Patch)(':reviewId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 수정',
            summary: '공간 리뷰를 수정합니다. 리뷰 작성자만 사용이 가능합니다.',
        },
        body: {
            type: dto_1.UpdateReviewDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('reviewId')),
    __param(2, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateReviewDTO, String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(':reviewId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 삭제',
            summary: '공간 리뷰를 삭제합니다. 리뷰 작성자만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Delete)('report/:reportId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 리뷰 신고 삭제',
            summary: '공간 리뷰 신고를 삭제합니다. 리뷰 신고자만 사용이 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReviewReport", null);
ReviewController = __decorate([
    (0, utils_1.ApiController)('reviews', '공간 리뷰'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map