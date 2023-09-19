import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { PaymentSuccessAlarmTalk } from '@/interface/alarm-talk.interface';
import type {
  CreateCouponDurationAlarm,
  CreateMarketingExhibitionAlarm,
  CreatePaymentSuccessAlarm,
  CreateQnAAnswerAlarm,
  CreateReservationAcceptedAlarm,
  CreateReservationAutoCanceledAlarm,
  CreateReservationGuestCanceledAlarm,
  CreateReservationHostCanceledAlarm,
  CreateReservationRejectedAlarm,
  CreateReservationUsageAlarm,
  CreateReviewAnswerAlarm,
  CreateReviewRecommendAlarm,
  SendAlarm,
  SendAlarmTarget,
  SendScheduleAlarm,
} from '@/interface/message.interface';

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

  createReviewAnswerAlarm(data: CreateReviewAnswerAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_REVIEW_ANSWER_ALARM, data);
  }

  createReservationGuestCanceledAlarm(data: CreateReservationGuestCanceledAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_GUEST_CANCELED_ALARM, data);
  }

  createReservationHostCanceledAlarm(data: CreateReservationHostCanceledAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_HOST_CANCELED_ALARM, data);
  }

  createReservationAutoCanceledAlarm(data: CreateReservationAutoCanceledAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_AUTO_CANCELED_ALARM, data);
  }

  createReservationRejectedAlarm(data: CreateReservationRejectedAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_REJECTED_ALARM, data);
  }

  createReservationAcceptedAlarm(data: CreateReservationAcceptedAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_RESERVATION_ACCEPTED_ALARM, data);
  }

  createPaymentSuccessAlarm(data: CreatePaymentSuccessAlarm) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.CREATE_PAYMENT_SUCCESS_ALARM, data);
  }

  deleteAlarm(alarmId: string) {
    this.eventEmitter.emit(MESSAGE_EVENT_NAME.DELETE_ALARM, alarmId);
  }
}
