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
exports.CurationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const curation_repository_1 = require("./curation.repository");
const curation_exception_1 = require("./exception/curation.exception");
const errorCode_1 = require("./exception/errorCode");
let CurationService = class CurationService {
    constructor(curationRepository) {
        this.curationRepository = curationRepository;
    }
    async findCuration(id) {
        return await this.curationRepository.findCuration(id);
    }
    async findCurations(args = {}) {
        return await this.curationRepository.findCurations(args);
    }
    async findPagingCurations(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.curationRepository.countCurations({
            where: args.where,
        });
        const curations = await this.curationRepository.findCurations({
            ...args,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(curations, { count, paging });
    }
    async createCuration(data, userId) {
        return await this.curationRepository.createCuration(data, userId);
    }
    async updateCuration(id, data, userId) {
        const curation = await this.findCuration(id);
        if (userId && curation.user.id !== userId) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.FORBIDDEN(errorCode_1.CURATION_MUTATE_FORBIDDEN));
        }
        await this.curationRepository.updateCuration(id, data);
    }
    async deleteCuration(id, userId) {
        const curation = await this.findCuration(id);
        if (userId && curation.user.id !== userId) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.FORBIDDEN(errorCode_1.CURATION_MUTATE_FORBIDDEN));
        }
        await this.curationRepository.deleteCuration(id);
    }
};
CurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [curation_repository_1.CurationRepository])
], CurationService);
exports.CurationService = CurationService;
//# sourceMappingURL=curation.service.js.map