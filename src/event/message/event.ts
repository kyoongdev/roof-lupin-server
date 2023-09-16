import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  CreateCouponDurationAlarm,
  CreateMarketingExhibitionAlarm,
  CreateQnAAnswerAlarm,
  CreateReservationUsageAlarm,
  CreateReviewRecommendAlarm,
  SendAlarm,
  SendAlarmTarget,
  SendScheduleAlarm,
} from '@/interface/fcm.interface';

import { MESSAGE_EVENT_NAME } from './constants';

@Injectable()
export class MessageEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendAlarm(user: SendAlarmTarget, data: SendAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.SEND_ALARM, user, data);
  }

  sendAlarms(users: SendAlarmTarget[], data: SendAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.SEND_ALARMS, users, data);
  }

  sendScheduleAlarm(user: SendAlarmTarget, data: SendScheduleAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.SEND_SCHEDULE_ALARM, user, data);
  }

  sendScheduleAlarms(users: SendAlarmTarget[], data: SendScheduleAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.SEND_SCHEDULE_ALARMS, users, data);
  }

  createReservationUsageAlarm(data: CreateReservationUsageAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM, data);
  }

  createReviewRecommendAlarm(data: CreateReviewRecommendAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM, data);
  }

  createCouponDurationAlarm(data: CreateCouponDurationAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_COUPON_DURATION_ALARM, data);
  }

  createQnAAnswerAlarm(data: CreateQnAAnswerAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_QNA_ANSWER_ALARM, data);
  }

  createMarketingAlarm(data: CreateMarketingExhibitionAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_MARKETING_ALARM, data);
  }

  deleteAlarm(alarmId: string) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.DELETE_ALARM, alarmId);
  }
}
