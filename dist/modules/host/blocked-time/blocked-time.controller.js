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
exports.BlockedTimeController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const blocked_time_1 = require("../dto/blocked-time");
const query_1 = require("../dto/blocked-time/query");
const blocked_time_service_1 = require("./blocked-time.service");
let BlockedTimeController = class BlockedTimeController {
    constructor(blockedTimeService) {
        this.blockedTimeService = blockedTimeService;
    }
    async getBlockedTime(id) {
        return await this.blockedTimeService.findBlockedTime(id);
    }
    async getBlockedTimes(paging, query) {
        return await this.blockedTimeService.findPagingBlockedTimes(paging, query_1.FindBlockedTimesQuery.generateQuery(query));
    }
    async createBlockedTime(user, body) {
        return await this.blockedTimeService.createBlockedTime(user.id, body);
    }
    async updateBlockedTime(id, user, body) {
        return await this.blockedTimeService.updateBlockedTime(id, user.id, body);
    }
    async deleteBlockedTime(id, user) {
        return await this.blockedTimeService.deleteBlockedTime(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':blockedTimeId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 차단된 시간 자세히 구하기',
            summary: '공간 차단된 시간 자세히 구하기 - 호스트만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: blocked_time_1.BlockedTimeDTO,
    }),
    __param(0, (0, common_1.Param)('blockedTimeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockedTimeController.prototype, "getBlockedTime", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 차단된 시간 목록 구하기',
            summary: '공간 차단된 시간 목록 구하기 - 호스트만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: blocked_time_1.BlockedTimeDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, query_1.FindBlockedTimesQuery]),
    __metadata("design:returntype", Promise)
], BlockedTimeController.prototype, "getBlockedTimes", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(utils_1.ResponseWithIdInterceptor),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 시간 차단하기',
            summary: '공간 시간 차단하기 - 호스트만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.ResponseWithIdDTO,
    }, 201),
    __param(0, (0, utils_1.ReqUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, blocked_time_1.CreateBlockedTimeDTO]),
    __metadata("design:returntype", Promise)
], BlockedTimeController.prototype, "createBlockedTime", null);
__decorate([
    (0, common_1.Patch)(':blockTimeId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 시간 차단 수정하기',
            summary: '공간 시간 차단 수정하기 - 호스트만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('blockTimeId')),
    __param(1, (0, utils_1.ReqUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, blocked_time_1.UpdateBlockedTimeDTO]),
    __metadata("design:returntype", Promise)
], BlockedTimeController.prototype, "updateBlockedTime", null);
__decorate([
    (0, common_1.Delete)(':blockTimeId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '공간 시간 차단 삭제하기',
            summary: '공간 시간 차단 삭제하기 - 호스트만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }, 204),
    __param(0, (0, common_1.Param)('blockTimeId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlockedTimeController.prototype, "deleteBlockedTime", null);
BlockedTimeController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('HOST')]),
    (0, utils_1.ApiController)('blocked-times', '[호스트] 시간 차단'),
    __metadata("design:paramtypes", [blocked_time_service_1.BlockedTimeService])
], BlockedTimeController);
exports.BlockedTimeController = BlockedTimeController;
//# sourceMappingURL=blocked-time.controller.js.map