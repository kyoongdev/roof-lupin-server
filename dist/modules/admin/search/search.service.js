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
exports.AdminSearchService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const search_repository_1 = require("../../search/search.repository");
let AdminSearchService = class AdminSearchService {
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }
    async findSearchRecommend(id) {
        return await this.searchRepository.findSearchRecommend(id);
    }
    async findPagingSearchRecommends(paging) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.searchRepository.countSearchRecommends();
        const searchRecommends = await this.searchRepository.findSearchRecommends({
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(searchRecommends, { count, paging });
    }
    async createSearchRecommend(data) {
        return await this.searchRepository.createSearchRecommend(data);
    }
    async updateSearchRecommend(id, data) {
        await this.searchRepository.findSearchRecommend(id);
        await this.searchRepository.updateSearchRecommend(id, data);
    }
    async deleteSearchRecommend(id) {
        await this.searchRepository.findSearchRecommend(id);
        await this.searchRepository.deleteSearchRecommend(id);
    }
};
AdminSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [search_repository_1.SearchRepository])
], AdminSearchService);
exports.AdminSearchService = AdminSearchService;
//# sourceMappingURL=search.service.js.map