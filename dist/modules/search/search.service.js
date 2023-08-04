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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const space_repository_1 = require("../space/space.repository");
const errorCode_1 = require("./exception/errorCode");
const search_exception_1 = require("./exception/search.exception");
const search_repository_1 = require("./search.repository");
let SearchService = class SearchService {
    constructor(searchRepository, spaceRepository) {
        this.searchRepository = searchRepository;
        this.spaceRepository = spaceRepository;
    }
    async findSearchRecord(id) {
        return await this.searchRepository.findSearchRecord(id);
    }
    async findSearchRecords(args = {}) {
        return await this.searchRepository.findSearchRecords(args);
    }
    async findSearchRecommends(args = {}) {
        return await this.searchRepository.findSearchRecommends(args);
    }
    async deleteSearchRecord(id, userId) {
        const searchRecord = await this.findSearchRecord(id);
        if (searchRecord.userId !== userId) {
            throw new search_exception_1.SearchException(errorCode_1.SEARCH_ERROR_CODE.FORBIDDEN(errorCode_1.SEARCH_RECORD_FORBIDDEN));
        }
        await this.searchRepository.deleteSearchRecord(id, userId);
    }
    async deleteAllSearchRecords(userId) {
        await this.searchRepository.deleteAllSearchRecords(userId);
    }
    async findMyRecentSpace(userId) {
        const spaces = await this.spaceRepository.findSpaces({
            where: {
                recentSpaces: {
                    some: {
                        userId,
                    },
                },
            },
        });
        return spaces;
    }
    async countMyRecentSpaces(userId) {
        return await this.searchRepository.countRecentSpaces({
            where: {
                userId,
            },
        });
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [search_repository_1.SearchRepository, space_repository_1.SpaceRepository])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map