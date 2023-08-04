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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const admin_service_1 = require("./admin.service");
const dto_1 = require("./dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAdmins(paging) {
        return await this.adminService.findPagingAdmins(paging);
    }
    async getMe(user) {
        return await this.adminService.findAdmin(user.id);
    }
    async getAdmin(adminId) {
        return await this.adminService.findAdmin(adminId);
    }
    async createAdmin(data) {
        return await this.adminService.createAdmin(data, true);
    }
    async checkAdmin(data) {
        return await this.adminService.checkAdminWithUserId(data);
    }
    async resetAdminPassword(data) {
        await this.adminService.updateAdminPassword(data);
    }
    async updateAdmin(adminId, data) {
        return await this.adminService.updateAdmin(adminId, data);
    }
    async deleteAdmin(adminId) {
        return await this.adminService.deleteAdmin(adminId);
    }
    async hardDeleteAdmin(adminId) {
        return await this.adminService.hardDeleteAdmin(adminId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 목록 조회',
            summary: '통합관리자 목록 조회',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AdminDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdmins", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 내 정보 조회',
            summary: '통합관리자  내 정보 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AdminDTO,
    }),
    __param(0, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':adminId/detail'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 조회',
            summary: '통합관리자  조회',
        },
        params: {
            type: 'string',
            name: 'adminId',
            description: '통합관리자 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AdminDTO,
    }),
    __param(0, (0, common_1.Param)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Post)(),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 생성',
            summary: '통합관리자 생성',
        },
        body: {
            type: dto_1.CreateAdminDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAdminDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('check'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 유저 id 존재 유무 파악',
            summary: '통합관리자 유저 id 존재 유무 파악',
        },
        body: {
            type: dto_1.CheckAdminDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.IsAdminCheckedDTO,
    }, 200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CheckAdminDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "checkAdmin", null);
__decorate([
    (0, common_1.Patch)('reset/password'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 비밀번호 재설정',
            summary: '통합관리자 비밀번호 재설정',
        },
        body: {
            type: dto_1.UpdateAdminPasswordDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateAdminPasswordDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetAdminPassword", null);
__decorate([
    (0, common_1.Patch)(':adminId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 수정',
            summary: '통합관리자 수정',
        },
        params: {
            type: 'string',
            name: 'adminId',
            description: '통합관리자 아이디',
        },
        body: {
            type: dto_1.UpdateAdminDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('adminId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAdminDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Delete)(':adminId'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 삭제',
            summary: '통합관리자 삭제',
        },
        params: {
            type: 'string',
            name: 'adminId',
            description: '통합관리자 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.Delete)(':adminId/hard'),
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '통합관리자 삭제 [하드]',
            summary: '통합관리자 삭제 - 사용에 유의하세요.',
        },
        params: {
            type: 'string',
            name: 'adminId',
            description: '통합관리자 아이디',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "hardDeleteAdmin", null);
AdminController = __decorate([
    (0, utils_1.ApiController)('', '통합관리자'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map