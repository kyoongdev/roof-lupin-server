import { Injectable } from '@nestjs/common';

import { JobCallback } from 'node-schedule';
import { EventEmitter } from 'stream';

import { CreateReservationUsageAlarm, CreateReviewRecommendAlarm } from '@/interface/fcm.interface';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEvent {
  constructor(private readonly eventEmitter: EventEmitter) {}

  createReservationUsageAlarm(jobId: string, data: CreateReservationUsageAlarm, callback: JobCallback) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM, jobId, data, callback);
  }

  createReviewRecommendAlarm(jobId: string, data: CreateReviewRecommendAlarm, callback: JobCallback) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM, jobId, data, callback);
  }

  createCouponDurationAlarm(jobId: string, data: CreateReviewRecommendAlarm, callback: JobCallback) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM, jobId, data, callback);
  }

  createQnAAnswerAlarm(jobId: string, data: CreateReviewRecommendAlarm, callback: JobCallback) {
    this.eventEmitter.emit(FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM, jobId, data, callback);
  }
}
