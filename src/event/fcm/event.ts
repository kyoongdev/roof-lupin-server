import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  CreateReservationUsageAlarm,
  CreateReviewRecommendAlarm,
  SendPushMessage,
  SendScheduleAlarm,
} from '@/interface/fcm.interface';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendAlarm(data: SendPushMessage) {
    this.eventEmitter.emit(FCM_EVENT_NAME.SEND_ALARM, data);
  }

  sendAlarms(data: SendPushMessage[]) {
    this.eventEmitter.emit(FCM_EVENT_NAME.SEND_ALARMS, data);
  }
  sendScheduleAlarm(data: SendScheduleAlarm) {
    this.eventEmitter.emit(FCM_EVENT_NAME.SEND_SCHEDULE_ALARM, data);
  }

  sendScheduleAlarms(data: SendScheduleAlarm[]) {
    this.eventEmitter.emit(FCM_EVENT_NAME.SEND_SCHEDULE_ALARMS, data);
  }

  createReservationUsageAlarm(data: CreateReservationUsageAlarm) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM, data);
  }

  createReviewRecommendAlarm(data: CreateReviewRecommendAlarm) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM, data);
  }

  createCouponDurationAlarm(data: CreateReviewRecommendAlarm) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM, data);
  }

  createQnAAnswerAlarm(data: CreateReviewRecommendAlarm) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM, data);
  }
}
