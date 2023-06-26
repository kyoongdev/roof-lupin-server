import { Injectable } from '@nestjs/common';

import { JobCallback } from 'node-schedule';
import { EventEmitter } from 'stream';

import { CreateReservationUsageAlarm, CreateReviewRecommendAlarm } from '@/interface/fcm.interface';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEvent {
  constructor(private readonly eventEmitter: EventEmitter) {}

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
