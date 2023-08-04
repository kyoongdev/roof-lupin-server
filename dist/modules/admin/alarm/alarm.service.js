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
exports.AdminAlarmService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const fcm_1 = require("../../../event/fcm");
const alarm_repository_1 = require("../../alarm/alarm.repository");
const fcm_2 = require("../../alarm/dto/fcm");
const alarm_exception_1 = require("../../alarm/exception/alarm.exception");
const errorCode_1 = require("../../alarm/exception/errorCode");
const user_repository_1 = require("../../user/user.repository");
let AdminAlarmService = class AdminAlarmService {
    constructor(alarmRepository, userRepository, fcmEvent) {
        this.alarmRepository = alarmRepository;
        this.userRepository = userRepository;
        this.fcmEvent = fcmEvent;
    }
    async sendAlarm(data) {
        const { userId, message } = data;
        const { pushToken } = await this.userRepository.findUserPushToken(data.userId);
        if (!pushToken) {
            throw new alarm_exception_1.AlarmException(errorCode_1.ALARM_ERROR_CODE.NOT_FOUND(errorCode_1.ALARM_PUSH_TOKEN_NOT_FOUND));
        }
        this.fcmEvent.sendAlarm({
            pushToken,
            userId,
        }, message);
        return new fcm_2.AlarmResultDTO({ userId });
    }
    async sendAlarms(data) {
        const { userIds, message } = data;
        const users = await Promise.all(userIds
            .map(async (userId) => {
            const { pushToken } = await this.userRepository.findUserPushToken(userId);
            if (!pushToken) {
                return null;
            }
            return {
                pushToken,
                userId,
            };
        })
            .filter(Boolean));
        users.forEach((user) => this.fcmEvent.sendAlarm(user, message));
        return new fcm_2.AlarmResultsDTO({ userIds });
    }
    async sendScheduleAlarm(data) {
        const { userId, message } = data;
        const { pushToken } = await this.userRepository.findUserPushToken(data.userId);
        if (!pushToken) {
            throw new alarm_exception_1.AlarmException(errorCode_1.ALARM_ERROR_CODE.NOT_FOUND(errorCode_1.ALARM_PUSH_TOKEN_NOT_FOUND));
        }
        this.fcmEvent.sendScheduleAlarm({ pushToken, userId }, message);
        return new fcm_2.AlarmResultDTO({ userId });
    }
    async sendScheduleAlarms(data) {
        const { userIds, message } = data;
        const users = await Promise.all(userIds
            .map(async (userId) => {
            const { pushToken } = await this.userRepository.findUserPushToken(userId);
            if (!pushToken) {
                return null;
            }
            return {
                pushToken,
                userId,
            };
        })
            .filter(Boolean));
        users.forEach((user) => this.fcmEvent.sendScheduleAlarm(user, message));
        return new fcm_2.AlarmResultsDTO({ userIds });
    }
    async findAlarm(id) {
        return await this.alarmRepository.findAlarm(id);
    }
    async findPagingAlarms(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const count = await this.alarmRepository.countAlarms({
            where: args.where,
        });
        const alarms = await this.alarmRepository.findAlarms({
            ...args,
            where: args.where,
            skip,
            take,
        });
        return new cumuco_nestjs_1.PaginationDTO(alarms, { count, paging });
    }
    async deleteAlarm(id) {
        this.fcmEvent.deleteAlarm(id);
        await this.alarmRepository.deleteAlarm(id);
    }
};
AdminAlarmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alarm_repository_1.AlarmRepository,
        user_repository_1.UserRepository,
        fcm_1.FCMEvent])
], AdminAlarmService);
exports.AdminAlarmService = AdminAlarmService;
//# sourceMappingURL=alarm.service.js.map