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
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const query_1 = require("../../user/dto/query");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const user_1 = require("../dto/user");
const user_service_1 = require("./user.service");
let AdminUserController = class AdminUserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findUser(id) {
        return await this.userService.findUser(id);
    }
    async findPagingUsers(paging, query) {
        return await this.userService.findPagingUsers(paging, query.generateQuery());
    }
    async updateUser(id, body) {
        return await this.userService.updateUser(id, body);
    }
    async blockUser(id, body) {
        return await this.userService.blockUser(id, body);
    }
    async unBlockUser(id) {
        return await this.userService.unBlockUser(id);
    }
    async restoreUser(id) {
        return await this.userService.restoreUser(id);
    }
    async deleteUsers(query) {
        await Promise.all(query.ids.split(',').map(async (id) => {
            await this.userService.hardDeleteUser(id);
        }));
    }
    async deleteUser(id) {
        return await this.userService.deleteUser(id);
    }
    async hardDeleteUser(id) {
        return await this.userService.hardDeleteUser(id);
    }
};
__decorate([
    (0, common_1.Get)(':userId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 상세 조회',
            summary: '유저 상세 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: user_1.AdminUserDTO,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(''),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 목록 조회',
            summary: '유저 목록 조회',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: user_1.AdminUserDTO,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindUsersQuery]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "findPagingUsers", null);
__decorate([
    (0, common_1.Patch)(':userId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 정보 수정',
            summary: '유저 정보 수정',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.AdminUpdateUserDTO]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)(':userId/block'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 차단시키기',
            summary: '유저 차단시키기',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.BlockUserDTO]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)(':userId/un-block'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 차단 해제',
            summary: '유저 차단 해제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "unBlockUser", null);
__decorate([
    (0, common_1.Post)(':userId/restore'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 복구',
            summary: '유저 복구',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "restoreUser", null);
__decorate([
    (0, common_1.Delete)('hard/many'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 다수 영구 삭제',
            summary: '유저 다수 영구 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.IdsDTO]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteUsers", null);
__decorate([
    (0, common_1.Delete)(':userId/soft'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 삭제',
            summary: '유저 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)(':userId/hard'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '유저 영구 삭제',
            summary: '유저 영구 삭제',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "hardDeleteUser", null);
AdminUserController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('users', '[관리자] 유저관리'),
    __metadata("design:paramtypes", [user_service_1.AdminUserService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=user.controller.js.map