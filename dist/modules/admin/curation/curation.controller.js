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
exports.AdminCurationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../curation/dto");
const query_1 = require("../../curation/dto/query");
const update_curation_space_dto_1 = require("../../curation/dto/update-curation-space.dto");
const utils_1 = require("../../../utils");
const curation_1 = require("../dto/curation");
const curation_service_1 = require("./curation.service");
let AdminCurationController = class AdminCurationController {
    constructor(curationService) {
        this.curationService = curationService;
    }
    async getCuration(id) {
        return await this.curationService.findCuration(id);
    }
    async getCurations(paging, query) {
        return await this.curationService.findPagingCurations(paging, query.generateQuery());
    }
    async countCurations() {
        return await this.curationService.countCurations();
    }
    async createCuration(body) {
        return await this.curationService.createCuration(body);
    }
    async createCurationSpace(id, body) {
        await this.curationService.createCurationSpace(id, body);
    }
    async updateCuration(id, data) {
        await this.curationService.updateCuration(id, data);
    }
    async updateCurationSpace(id, data) {
        await this.curationService.updateCurationSpace(id, data);
    }
    async updateCurationOrder(id, data) {
        await this.curationService.updateCurationOrder(id, data.orderNo);
    }
    async deleteCuration(id) {
        await this.curationService.deleteCuration(id);
    }
    async deleteCurationSpace(curationId, spaceId) {
        await this.curationService.deleteCurationSpace(curationId, spaceId);
    }
};
__decorate([
    (0, common_1.Get)(':curationId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 자세히 불러오기',
            summary: '큐레이션 자세히 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CurationDetailDTO,
    }),
    __param(0, (0, common_1.Param)('curationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "getCuration", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 목록 불러오기',
            summary: '큐레이션 목록 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.CurationDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindCurationsQuery]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "getCurations", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 개수 불러오기',
            summary: '큐레이션 개수 불러오기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: curation_1.CurationCountDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "countCurations", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 생성하기',
            summary: '큐레이션 생성하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [curation_1.AdminCreateCurationDTO]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "createCuration", null);
__decorate([
    (0, common_1.Post)(':curationId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션에 공간 추가하기',
            summary: '큐레이션에 공간 추가하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 200),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateCurationSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "createCurationSpace", null);
__decorate([
    (0, common_1.Patch)(':curationId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 수정하기',
            summary: '큐레이션 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, curation_1.AdminUpdateCurationDTO]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "updateCuration", null);
__decorate([
    (0, common_1.Patch)(':curationId/spaces'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 공간 수정하기',
            summary: '큐레이션 공간 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 200),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_curation_space_dto_1.UpdateCurationSpaceDTO]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "updateCurationSpace", null);
__decorate([
    (0, common_1.Patch)(':curationId/order'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 순서 수정하기',
            summary: '큐레이션 순서 수정하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, curation_1.AdminUpdateCurationOrderDTO]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "updateCurationOrder", null);
__decorate([
    (0, common_1.Delete)(':curationId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 삭제하기',
            summary: '큐레이션 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "deleteCuration", null);
__decorate([
    (0, common_1.Delete)(':curationId/spaces/:spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '큐레이션 공간 삭제하기',
            summary: '큐레이션 공간 삭제하기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('curationId')),
    __param(1, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminCurationController.prototype, "deleteCurationSpace", null);
AdminCurationController = __decorate([
    (0, utils_1.ApiController)('/curations', '[관리자] 큐레이션 관리'),
    __metadata("design:paramtypes", [curation_service_1.AdminCurationService])
], AdminCurationController);
exports.AdminCurationController = AdminCurationController;
//# sourceMappingURL=curation.controller.js.map