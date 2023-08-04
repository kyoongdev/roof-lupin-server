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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const ranking_service_1 = require("./ranking.service");
let RankingController = class RankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking(id) {
        return await this.rankingService.findRanking(id);
    }
    async getRankingPagingSpaces(id, paging) {
        return await this.rankingService.findRankingPagingSpaces(id, paging);
    }
    async getRankingIds() {
        return await this.rankingService.findRankingIds();
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
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)(':rankingId/spaces/paging'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 공간 페이징 조회',
            summary: '랭킹 공간 페이징 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.PagingRankingDTO,
    }),
    __param(0, (0, common_1.Param)('rankingId')),
    __param(1, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRankingPagingSpaces", null);
__decorate([
    (0, common_1.Get)('ids'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '랭킹 아이디 조회',
            summary: '랭킹 아이디 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.RankingIdsDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRankingIds", null);
RankingController = __decorate([
    (0, utils_1.ApiController)('rankings', '랭킹 '),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], RankingController);
exports.RankingController = RankingController;
//# sourceMappingURL=ranking.controller.js.map