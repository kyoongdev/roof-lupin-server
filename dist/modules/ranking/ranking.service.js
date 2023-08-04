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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const ranking_repository_1 = require("./ranking.repository");
let RankingService = class RankingService {
    constructor(rankingRepository) {
        this.rankingRepository = rankingRepository;
    }
    async findRanking(id) {
        return await this.rankingRepository.findRanking(id);
    }
    async findRankingPagingSpaces(id, paging) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.rankingRepository.countRankingSpaces(id);
        const ranking = await this.rankingRepository.findRanking(id, {
            skip,
            take,
        });
        return new dto_1.PagingRankingDTO({
            ...ranking,
            paging: {
                count,
                paging,
            },
        });
    }
    async findRankingIds() {
        return await this.rankingRepository.findRankingIds();
    }
};
RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_repository_1.RankingRepository])
], RankingService);
exports.RankingService = RankingService;
//# sourceMappingURL=ranking.service.js.map