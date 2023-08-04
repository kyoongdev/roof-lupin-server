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
exports.AdminRankingController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../ranking/dto");
const query_1 = require("../../ranking/dto/query");
const utils_1 = require("../../../utils");
const ranking_service_1 = require("./ranking.service");
let AdminRankingController = class AdminRankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(id) {
        return await this.rankingService.findRanking(id);
    }
    async getRankings(paging, query) {
        return await this.rankingService.findPagingRankings(paging, query.generateQuery());
    }
    async createRanking(body) {
        return await this.rankingService.createRanking(body);
    }
    async createRankingSpace(id, body) {
        await this.rankingService.createRankingSpace(id, body);
    }
    async updateRanking(id, body) {
        await this.rankingService.updateRanking(id, body);
    }
    async updateRankingSpace(id, body) {
        await this.rankingService.updateRankingSpace(id, body);
    }
    async deleteRanking(id) {
        await this.rankingService.deleteRanking(id);
    }
    async deleteRankingSpace(rankingId, spaceId) {
        await this.rankingService.deleteRankingSpace(rankingId, spaceId);
    }
};
__decorate([
    (0, common_1.Get)(':rankingId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 자세히 불러오기',
            summary: '랭킹 자세히 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.RankingDTO,
    }),
    __param(0, (0, common_1.Param)('rankingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 목록 불러오기',
            summary: '랭킹 목록 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.RankingDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindRankingsQuery]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "getRankings", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 생성하기',
            summary: '랭킹 생성하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRankingDTO]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "createRanking", null);
__decorate([
    (0, common_1.Post)(':rankingId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 공간 추가하기',
            summary: '랭킹 공간 추가하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 201),
    __param(0, (0, common_1.Param)('rankingId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateRankingSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "createRankingSpace", null);
__decorate([
    (0, common_1.Patch)(':rankingId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 수정하기',
            summary: '랭킹 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('rankingId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateRankingDTO]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "updateRanking", null);
__decorate([
    (0, common_1.Patch)(':rankingId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 공간 수정하기',
            summary: '랭킹 공간 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('rankingId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateRankingSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "updateRankingSpace", null);
__decorate([
    (0, common_1.Delete)(':rankingId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 삭제하기',
            summary: '랭킹 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('rankingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "deleteRanking", null);
__decorate([
    (0, common_1.Delete)(':rankingId/spaces/:spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 공간 삭제하기',
            summary: '랭킹 공간 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('rankingId')),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminRankingController.prototype, "deleteRankingSpace", null);
AdminRankingController = __decorate([
    (0, utils_1.ApiController)('rankings', '[관리자] 랭킹 컨텐츠 관리'),
    __metadata("design:paramtypes", [ranking_service_1.AdminRankingService])
], AdminRankingController);
exports.AdminRankingController = AdminRankingController;
//# sourceMappingURL=ranking.controller.js.map