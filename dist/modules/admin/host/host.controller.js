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
exports.AdminHostController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../host/dto");
const host_detail_dto_1 = require("../../host/dto/host-detail.dto");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const host_service_1 = require("./host.service");
let AdminHostController = class AdminHostController {
    constructor(hostService) {
        this.hostService = hostService;
    }
    async getHosts(paging) {
        return await this.hostService.findPagingHosts(paging);
    }
    async getHostDetail(hostId) {
        return await this.hostService.findHost(hostId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '호스트 목록 조회',
            summary: '호스트 목록 조회 - 관리자만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.HostDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminHostController.prototype, "getHosts", null);
__decorate([
    (0, common_1.Get)(':hostId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '호스트 상세 조회',
            summary: '호스트 상세 조회 - 관리자만 사용 가능',
        },
        params: {
            name: 'hostId',
            description: '호스트 아이디',
            required: true,
            type: 'string',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: host_detail_dto_1.HostDetailDTO,
    }),
    __param(0, (0, common_1.Param)('hostId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminHostController.prototype, "getHostDetail", null);
AdminHostController = __decorate([
    (0, utils_1.ApiController)('hosts', '[관리자] 호스트 관리'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    __metadata("design:paramtypes", [host_service_1.AdminHostService])
], AdminHostController);
exports.AdminHostController = AdminHostController;
//# sourceMappingURL=host.controller.js.map