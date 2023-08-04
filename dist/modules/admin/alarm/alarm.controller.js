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
exports.AdminAlarmController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const common_2 = require("../../../common");
const dto_1 = require("../../alarm/dto");
const fcm_1 = require("../../alarm/dto/fcm");
const utils_1 = require("../../../utils");
const guards_1 = require("../../../utils/guards");
const role_guard_1 = require("../../../utils/guards/role.guard");
const alarm_service_1 = require("./alarm.service");
let AdminAlarmController = class AdminAlarmController {
    constructor(alarmService) {
        this.alarmService = alarmService;
    }
    async getAlarms(paging) {
        return await this.alarmService.findPagingAlarms(paging);
    }
    async getAlarm(id) {
        return await this.alarmService.findAlarm(id);
    }
    async sendAlarm(body) {
        return await this.alarmService.sendAlarm(body);
    }
    async sendAlarms(body) {
        return await this.alarmService.sendAlarms(body);
    }
    async sendScheduleAlarm(body) {
        return await this.alarmService.sendScheduleAlarm(body);
    }
    async sendScheduleAlarms(body) {
        return await this.alarmService.sendScheduleAlarms(body);
    }
    async deleteAlarm(id) {
        await this.alarmService.deleteAlarm(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 목록 불러오기',
            summary: '알람 목록 불러오기 - 관리자만 사용 가능합니다.',
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cumuco_nestjs_1.PagingDTO]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "getAlarms", null);
__decorate([
    (0, common_1.Get)(':alarmId/detail'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 상세 불러오기',
            summary: '알람 상세 불러오기 - 관리자만 사용 가능합니다.',
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
], AdminAlarmController.prototype, "getAlarm", null);
__decorate([
    (0, common_1.Post)('/fcm'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 보내기',
            summary: '알람 보내기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: fcm_1.AlarmResultDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fcm_1.SendMessageDTO]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "sendAlarm", null);
__decorate([
    (0, common_1.Post)('/fcm/many'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '다수 알람 보내기',
            summary: '다수 알람 보내기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: fcm_1.AlarmResultsDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fcm_1.SendMessagesDTO]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "sendAlarms", null);
__decorate([
    (0, common_1.Post)('/fcm/schedule'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '특정 시간대 알람 보내기',
            summary: '특정 알람 보내기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: fcm_1.AlarmResultDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fcm_1.SendScheduleMessageDTO]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "sendScheduleAlarm", null);
__decorate([
    (0, common_1.Post)('/fcm/schedule/many'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '특정 시간대 다수 알람 보내기',
            summary: '특정 시간대 다수 알람 보내기 - 관리자만 사용 가능합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: fcm_1.AlarmResultsDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fcm_1.SendScheduleMessagesDTO]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "sendScheduleAlarms", null);
__decorate([
    (0, common_1.Delete)(':alarmId'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '알람 삭제하기',
            summary: '알람 삭제하기 - 관리자만 사용 가능합니다.',
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
    }, 204),
    __param(0, (0, common_1.Param)('alarmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminAlarmController.prototype, "deleteAlarm", null);
AdminAlarmController = __decorate([
    (0, cumuco_nestjs_1.Auth)([guards_1.JwtAuthGuard, (0, role_guard_1.RoleGuard)('ADMIN')]),
    (0, utils_1.ApiController)('alarms', '[관리자] 알람 관리'),
    __metadata("design:paramtypes", [alarm_service_1.AdminAlarmService])
], AdminAlarmController);
exports.AdminAlarmController = AdminAlarmController;
//# sourceMappingURL=alarm.controller.js.map