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
exports.FCMEventProvider = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const nanoid_1 = require("nanoid");
const date_1 = require("../../common/date");
const prisma_service_1 = require("../../database/prisma.service");
const log_1 = require("../../log");
const fcm_1 = require("../../utils/fcm");
const scheduler_1 = require("../scheduler");
const constants_1 = require("./constants");
let FCMEventProvider = class FCMEventProvider {
    constructor(database, fcmService, schedulerEvent) {
        this.database = database;
        this.fcmService = fcmService;
        this.schedulerEvent = schedulerEvent;
    }
    async sendAlarm(user, data) {
        const alarm = await this.createAlarm({
            title: data.title,
            content: data.body,
            isPush: true,
            userId: user.userId,
            alarmAt: new Date(),
            ...(data.spaceId && {
                spaceId: data.spaceId,
            }),
            ...(data.exhibitionId && {
                exhibitionId: data.exhibitionId,
            }),
        });
        await this.fcmService.sendMessage({
            ...data,
            token: user.pushToken,
        });
        await this.updatePushedAlarm(alarm.id);
    }
    async sendAlarms(users, data) {
        await Promise.all(users.map(async (user) => {
            this.sendAlarm(user, data);
        }));
    }
    async sendScheduleAlarm(user, data) {
        const date = new Date();
        const alarm = await this.createAlarm({
            title: data.title,
            content: data.body,
            isPush: true,
            userId: user.userId,
            alarmAt: data.targetDate,
            ...(data.spaceId && {
                spaceId: data.spaceId,
            }),
            ...(data.exhibitionId && {
                exhibitionId: data.exhibitionId,
            }),
        });
        this.schedulerEvent.createSchedule(`${user.userId}_${date.getTime()}_${(0, nanoid_1.nanoid)(2)}`, data.targetDate, async () => {
            await this.fcmService.sendMessage({
                ...data,
                token: user.pushToken,
            });
            await this.updatePushedAlarm(alarm.id);
        });
    }
    async sendScheduleAlarms(users, data) {
        await Promise.all(users.map(async (user) => {
            this.sendScheduleAlarm(user, data);
        }));
    }
    async createReservationUsageAlarm(data) {
        const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), data.time - 1);
        const alarmData = {
            title: '예약 사용 알림',
            body: `${data.nickname}님! 예약하신 ${data.spaceName} 사용 시작 시간 [${data.year}.${data.month}.${data.day} ${data.time}시] 까지 1시간 남았어요!`,
        };
        const alarm = await this.createAlarm({
            title: alarmData.title,
            content: alarmData.body,
            isPush: true,
            userId: data.userId,
            alarmAt: targetDate,
        });
        this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
            const user = await this.database.user.findUnique({
                where: {
                    id: data.userId,
                },
            });
            await this.sendAlarmWithUpdate(alarm.id, {
                ...alarmData,
                token: user.pushToken,
                isAlarmAccepted: user.isAlarmAccepted,
            });
        });
    }
    async createReviewRecommendAlarm(data) {
        const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), 4, 0, 0);
        const alarmData = {
            title: '리뷰를 달아주세요!',
            body: `${data.nickname}님! ${data.spaceName}에서 즐거운 시간 보내셨나요? 리뷰를 남겨보세요!`,
        };
        const alarm = await this.createAlarm({
            title: alarmData.title,
            content: alarmData.body,
            isPush: true,
            userId: data.userId,
            alarmAt: targetDate,
        });
        this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
            const user = await this.database.user.findUnique({
                where: {
                    id: data.userId,
                },
            });
            await this.sendAlarmWithUpdate(alarm.id, {
                ...alarmData,
                token: user.pushToken,
                isAlarmAccepted: user.isAlarmAccepted,
            });
        });
    }
    async createCouponDurationAlarm(data) {
        const targetDate = new Date(data.dueDate);
        targetDate.setUTCDate(targetDate.getUTCDate() - 5);
        const alarmData = {
            title: '쿠폰 기한 만료 전 알림',
            body: `${data.nickname}님! 사용 만료까지 얼마 안남은 쿠폰이 있어요! 쿠폰함에서 확인해보세요!`,
            link: '',
        };
        const alarm = await this.createAlarm({
            title: alarmData.title,
            content: alarmData.body,
            isPush: true,
            userId: data.userId,
            alarmAt: targetDate,
        });
        this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
            const user = await this.database.user.findUnique({
                where: {
                    id: data.userId,
                },
            });
            await this.sendAlarmWithUpdate(alarm.id, {
                ...alarmData,
                token: user.pushToken,
                isAlarmAccepted: user.isAlarmAccepted,
            });
        });
    }
    async createQnAAnswerAlarm(data) {
        const alarmData = {
            title: 'Q&A 관련 알림',
            body: `${data.nickname}님! ${data.spaceName}에 문의하신 내용에 대한 답변이 올라왔어요! 확인해보세요.!`,
            token: data.pushToken,
            isAlarmAccepted: data.isAlarmAccepted,
            link: 'https://rooflupin.page.link/5kaA',
        };
        try {
            const alarm = await this.createAlarm({
                title: alarmData.title,
                content: alarmData.body,
                isPush: true,
                userId: data.userId,
                alarmAt: new Date(),
            });
            await this.fcmService.sendMessage(alarmData);
            await this.updatePushedAlarm(alarm.id);
        }
        catch (err) {
            log_1.logger.error(err);
        }
    }
    async createMarketIngAlarm(data) {
        const currentDate = new Date();
        const targetDate = new Date(data.startAt);
        targetDate.setDate(targetDate.getDate() - 1);
        const alarmData = {
            title: `루프루팡과 함께 ${data.title}을 즐겨봐요`,
            body: data.title,
            link: '',
        };
        const dateDiff = (0, date_1.getDateDiff)(currentDate, targetDate);
        const alarm = await this.createAlarm({
            title: alarmData.title,
            content: alarmData.body,
            isPush: true,
            userId: data.userId,
            exhibitionId: data.exhibitionId,
            alarmAt: dateDiff <= 1 ? new Date() : targetDate,
        });
        if (dateDiff <= 1) {
            const user = await this.database.user.findUnique({
                where: {
                    id: data.userId,
                },
            });
            await this.sendAlarmWithUpdate(alarm.id, {
                ...alarmData,
                token: user.pushToken,
                isAlarmAccepted: user.isAlarmAccepted,
            });
        }
        else {
            this.schedulerEvent.createSchedule(`${data.userId}_${data.exhibitionId}`, targetDate, async () => {
                const user = await this.database.user.findUnique({
                    where: {
                        id: data.userId,
                    },
                });
                await this.sendAlarmWithUpdate(alarm.id, {
                    ...alarmData,
                    token: user.pushToken,
                    isAlarmAccepted: user.isAlarmAccepted,
                });
            });
        }
    }
    async deleteAlarm(jobId) {
        this.schedulerEvent.deleteSchedule(jobId);
    }
    async sendAlarmWithUpdate(alarmId, data) {
        if (data.token && data.isAlarmAccepted) {
            await this.fcmService.sendMessage(data);
        }
        await this.updatePushedAlarm(alarmId);
    }
    async createAlarm(data) {
        const { userId, spaceId, exhibitionId, ...rest } = data;
        return await this.database.userAlarm.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                ...(spaceId && {
                    alarmSpace: {
                        create: {
                            space: {
                                connect: {
                                    id: spaceId,
                                },
                            },
                        },
                    },
                }),
                ...(exhibitionId && {
                    alarmExhibition: {
                        create: {
                            exhibition: {
                                connect: {
                                    id: exhibitionId,
                                },
                            },
                        },
                    },
                }),
            },
        });
    }
    async updatePushedAlarm(id) {
        await this.database.userAlarm.update({
            where: {
                id,
            },
            data: {
                isPushed: true,
            },
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.SEND_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "sendAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.SEND_ALARMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "sendAlarms", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.SEND_SCHEDULE_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "sendScheduleAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.SEND_SCHEDULE_ALARMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "sendScheduleAlarms", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "createReservationUsageAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "createReviewRecommendAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "createCouponDurationAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "createQnAAnswerAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.CREATE_MARKETING_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "createMarketIngAlarm", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.FCM_EVENT_NAME.DELETE_ALARM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FCMEventProvider.prototype, "deleteAlarm", null);
FCMEventProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fcm_1.FCMProvider,
        scheduler_1.SchedulerEvent])
], FCMEventProvider);
exports.FCMEventProvider = FCMEventProvider;
//# sourceMappingURL=provider.js.map