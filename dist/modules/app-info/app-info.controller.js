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
exports.AppInfoController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const cache_1 = require("../../utils/cache");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const app_info_service_1 = require("./app-info.service");
const cache_2 = require("./cache");
const dto_1 = require("./dto");
let AppInfoController = class AppInfoController {
    constructor(appInfoService) {
        this.appInfoService = appInfoService;
    }
    async findAppInfos() {
        return this.appInfoService.findAppInfos();
    }
    async createAppInfo(data) {
        return this.appInfoService.createAppInfo(data);
    }
    async updateAppInfo(id, body) {
        return this.appInfoService.updateAppInfo(id, body);
    }
    async deleteAppInfo(id) {
        return this.appInfoService.deleteAppInfo(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cache_1.CreateCache)({ key: cache_2.APP_INFO_CACHE.KEY, ttl: cache_2.APP_INFO_CACHE.TTL }),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '앱 정보 조회',
            summary: '앱 정보 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AppInfoDTO,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "findAppInfos", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cache_1.DeleteCache)(cache_2.APP_INFO_CACHE.KEY),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '앱 정보 생성',
            summary: '앱 정보 생성 - 관리자만 사용가능합니다.',
        },
        body: {
            type: dto_1.CreateAppInfoDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAppInfoDTO]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "createAppInfo", null);
__decorate([
    (0, common_1.Patch)(':appInfoId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '앱 정보 수정',
            summary: '앱 정보 수정 - 관리자만 사용가능합니다.',
        },
        params: {
            description: '앱 정보 아이디',
            type: 'string',
            name: 'appInfoId',
            required: true,
        },
        body: {
            type: dto_1.UpdateAppInfoDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('appInfoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAppInfoDTO]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "updateAppInfo", null);
__decorate([
    (0, common_1.Delete)(':appInfoId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '앱 정보 삭제',
            summary: '앱 정보 삭제 - 관리자만 사용가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('appInfoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "deleteAppInfo", null);
AppInfoController = __decorate([
    (0, utils_1.ApiController)('app-infos', '앱 정보'),
    __metadata("design:paramtypes", [app_info_service_1.AppInfoService])
], AppInfoController);
exports.AppInfoController = AppInfoController;
//# sourceMappingURL=app-info.controller.js.map