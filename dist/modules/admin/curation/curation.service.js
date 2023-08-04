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
exports.AdminCurationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const curation_repository_1 = require("../../curation/curation.repository");
const curation_exception_1 = require("../../curation/exception/curation.exception");
const errorCode_1 = require("../../curation/exception/errorCode");
const curation_1 = require("../dto/curation");
let AdminCurationService = class AdminCurationService {
    constructor(curationRepository) {
        this.curationRepository = curationRepository;
    }
    async countCurations() {
        const count = await this.curationRepository.countCurations();
        return new curation_1.CurationCountDTO({ count });
    }
    async findCuration(id) {
        return await this.curationRepository.findCuration(id);
    }
    async findPagingCurations(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.curationRepository.countCurations({
            where: args.where,
        });
        const curations = await this.curationRepository.findCurations({
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(curations, { count, paging });
    }
    async createCuration(data) {
        return await this.curationRepository.createCuration(data);
    }
    async createCurationSpace(curationId, data) {
        await this.findCuration(curationId);
        const isExist = await this.curationRepository.checkCurationSpace(curationId, data.spaceId);
        if (isExist) {
            throw new curation_exception_1.CurationException(errorCode_1.CURATION_ERROR_CODE.CONFLICT(errorCode_1.CURATION_SPACE_ALREADY_EXIST));
        }
        await this.curationRepository.createCurationSpace(curationId, data);
    }
    async updateCuration(id, data) {
        await this.findCuration(id);
        await this.curationRepository.updateCuration(id, data);
    }
    async updateCurationSpace(curationId, data) {
        await this.curationRepository.updateCurationSpace(curationId, data);
    }
    async updateCurationOrder(curation, orderNo) {
        await this.findCuration(curation);
        await this.curationRepository.updateCurationOrder(curation, orderNo);
    }
    async deleteCuration(id) {
        await this.curationRepository.deleteCuration(id);
    }
    async deleteCurationSpace(curationId, spaceId) {
        await this.curationRepository.deleteCurationSpace(curationId, spaceId);
    }
};
AdminCurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [curation_repository_1.CurationRepository])
], AdminCurationService);
exports.AdminCurationService = AdminCurationService;
//# sourceMappingURL=curation.service.js.map