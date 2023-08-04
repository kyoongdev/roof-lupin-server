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
exports.HostController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const dto_1 = require("./dto");
const host_detail_dto_1 = require("./dto/host-detail.dto");
const host_service_1 = require("./host.service");
let HostController = class HostController {
    constructor(hostService) {
        this.hostService = hostService;
    }
    async getHostBySpaceId(id) {
        return await this.hostService.findHostBySpaceId(id);
    }
    async getMe(user) {
        return await this.hostService.findHost(user.id);
    }
    async getMeDetail(user) {
        return await this.hostService.findHostDetail(user.id);
    }
    async checkHost(body) {
        return await this.hostService.checkHost(body);
    }
    async getMyAccount(user) {
        return await this.hostService.findHostAccountByHostId(user.id);
    }
    async updatePassword(body) {
        return await this.hostService.updateHostPassword(body);
    }
    async updateMe(user, body) {
        await this.hostService.updateHost(user.id, body);
    }
    async deleteMe(user) {
        await this.hostService.deleteHost(user.id);
    }
    async createAccount(user, body) {
        return await this.hostService.createHostAccount(user.id, body);
    }
    async updateAccount(user, body) {
        await this.hostService.updateHostAccountByHostId(user.id, body);
    }
    async deleteAccount(user) {
        await this.hostService.deleteHostAccountByHostId(user.id);
    }
};
__decorate([
    (0, common_1.Get)('spaces/:spaceId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 id 로 호스트 조회하기기',
            summary: '공간 id 로 호스트 조회하기기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.HostDTO,
    }),
    __param(0, (0, common_1.Param)('spaceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getHostBySpaceId", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 정보 조회',
            summary: '내 정보 조회 - 호스트만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.HostDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('me/detail'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 정보 상세 조회',
            summary: '내 정보 상세 조회 - 호스트만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: host_detail_dto_1.HostDetailDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getMeDetail", null);
__decorate([
    (0, common_1.Post)('check'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '호스트 유무 확인',
            summary: '호스트 유무 확인',
        },
        body: {
            type: dto_1.CheckHostDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.IsHostCheckedDTO,
    }, 200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CheckHostDTO]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "checkHost", null);
__decorate([
    (0, common_1.Get)('accounts/me'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 계좌 정보 조회',
            summary: '내 계좌 조회 - 호스트만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.HostAccountDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getMyAccount", null);
__decorate([
    (0, common_1.Post)('reset/password'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '비밀번호 재설정',
            summary: '비밀번호 재설정',
        },
        body: {
            type: dto_1.UpdateHostPasswordDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.NewPasswordDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateHostPasswordDTO]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 정보 수정',
            summary: '내 정보 수정 - 호스트만 사용 가능',
        },
        body: {
            type: dto_1.UpdateHostDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateHostDTO]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Delete)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '내 정보 삭제',
            summary: '내 정보 삭제 - 호스트만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.Post)('accounts'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '계좌 정보 생성',
            summary: '계좌 정보 생성 - 호스트만 사용 가능',
        },
        body: {
            type: dto_1.CreateHostAccountDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateHostAccountDTO]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Patch)('accounts'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '계좌 정보 수정',
            summary: '계좌 정보 수정 - 호스트만 사용 가능',
        },
        body: {
            type: dto_1.UpdateHostAccountDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateHostAccountDTO]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Delete)('accounts'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '계좌 정보 삭제',
            summary: '계좌 정보 삭제 - 호스트만 사용 가능',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "deleteAccount", null);
HostController = __decorate([
    (0, utils_1.ApiController)('', '호스트'),
    __metadata("design:paramtypes", [host_service_1.HostService])
], HostController);
exports.HostController = HostController;
//# sourceMappingURL=host.controller.js.map