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
exports.AlarmController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../common");
const utils_1 = require("../../utils");
const guards_1 = require("../../utils/guards");
const role_guard_1 = require("../../utils/guards/role.guard");
const alarm_service_1 = require("./alarm.service");
const dto_1 = require("./dto");
let AlarmController = class AlarmController {
    constructor(alarmService) {
        this.alarmService = alarmService;
    }
    async getAlarm(id) {
        return await this.alarmService.findAlarm(id);
    }
    async getAlarms(paging, user) {
        return await this.alarmService.findPagingAlarms(paging, {
            where: {
                userId: user.id,
            },
        });
    }
    async readAlarm(id, user) {
        return await this.alarmService.readAlarm(id, user.id);
    }
    async deleteAlarm(id, user) {
        return await this.alarmService.deleteAlarm(id, user.id);
    }
};
__decorate([
    (0, common_1.Get)(':alarmId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 상세 불러오기',
            summary: '알람 상세 불러오기 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'alarmId',
            type: 'string',
            required: true,
            description: '알람 ID',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AlarmDTO,
    }),
    __param(0, (0, common_1.Param)('alarmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlarmController.prototype, "getAlarm", null);
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 목록 불러오기',
            summary: '알람 목록 불러오기 - 유저만 사용 가능합니다.',
        },
        query: {
            type: cumuco_nestjs_1.PagingDTO,
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.AlarmDTO,
        isPaging: true,
    }),
    __param(0, (0, cumuco_nestjs_1.Paging)()),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO, Object]),
    __metadata("design:returntype", Promise)
], AlarmController.prototype, "getAlarms", null);
__decorate([
    (0, common_1.Post)(':alarmId/read'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 읽음 처리',
            summary: '알람 읽음 처리 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'alarmId',
            type: 'string',
            required: true,
            description: '알람 ID',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('alarmId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlarmController.prototype, "readAlarm", null);
__decorate([
    (0, common_1.Delete)(':alarmId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 삭제',
            summary: '알람 삭제 - 유저만 사용 가능합니다.',
        },
        params: {
            name: 'alarmId',
            type: 'string',
            required: true,
            description: '알람 ID',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: common_2.EmptyResponseDTO,
    }),
    __param(0, (0, common_1.Param)('alarmId')),
    __param(1, (0, utils_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlarmController.prototype, "deleteAlarm", null);
AlarmController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('USER')]),
    (0, utils_1.ApiController)('alarms', '알람'),
    __metadata("design:paramtypes", [alarm_service_1.AlarmService])
], AlarmController);
exports.AlarmController = AlarmController;
//# sourceMappingURL=alarm.controller.js.map