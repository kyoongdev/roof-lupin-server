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
exports.AdminRankingService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const ranking_repository_1 = require("../../ranking/ranking.repository");
let AdminRankingService = class AdminRankingService {
    constructor(rankingRepository) {
        this.rankingRepository = rankingRepository;
    }
    async findRanking(id) {
        return await this.rankingRepository.findRanking(id);
    }
    async findPagingRankings(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.rankingRepository.countRankings({
            where: args.where,
        });
        const rankings = await this.rankingRepository.findRankings({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(rankings, { count, paging });
    }
    async createRanking(data) {
        return await this.rankingRepository.createRanking(data);
    }
    async createRankingSpace(rankingId, data) {
        await this.findRanking(rankingId);
        await this.createRankingSpace(rankingId, data);
    }
    async updateRanking(id, data) {
        await this.findRanking(id);
        await this.rankingRepository.updateRanking(id, data);
    }
    async updateRankingSpace(rankingId, data) {
        await this.findRanking(rankingId);
        await this.updateRankingSpace(rankingId, data);
    }
    async deleteRanking(id) {
        await this.findRanking(id);
        await this.rankingRepository.deleteRanking(id);
    }
    async deleteRankingSpace(rankingId, spaceId) {
        await this.findRanking(rankingId);
        await this.rankingRepository.deleteRankingSpace(rankingId, spaceId);
    }
};
AdminRankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_repository_1.RankingRepository])
], AdminRankingService);
exports.AdminRankingService = AdminRankingService;
//# sourceMappingURL=ranking.service.js.map