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
exports.FCMEvent = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("./constants");
let FCMEvent = class FCMEvent {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    sendAlarm(user, data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.SEND_ALARM, user, data);
    }
    sendAlarms(users, data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.SEND_ALARMS, users, data);
    }
    sendScheduleAlarm(user, data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.SEND_SCHEDULE_ALARM, user, data);
    }
    sendScheduleAlarms(users, data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.SEND_SCHEDULE_ALARMS, users, data);
    }
    createReservationUsageAlarm(data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM, data);
    }
    createReviewRecommendAlarm(data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM, data);
    }
    createCouponDurationAlarm(data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM, data);
    }
    createQnAAnswerAlarm(data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM, data);
    }
    createMarketingAlarm(data) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.CREATE_MARKETING_ALARM, data);
    }
    deleteAlarm(alarmId) {
        this.eventEmitter.emit(constants_1.FCM_EVENT_NAME.DELETE_ALARM, alarmId);
    }
};
FCMEvent = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], FCMEvent);
exports.FCMEvent = FCMEvent;
//# sourceMappingURL=event.js.map