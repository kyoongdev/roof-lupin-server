import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { FCMProvider } from '@/common/fcm';
import {
  CreateCouponDurationAlarm,
  CreateQnAAnswerAlarm,
  CreateReservationUsageAlarm,
} from '@/interface/fcm.interface';

import { SchedulerEvent } from '../scheduler';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEventProvider {
  constructor(private readonly fcmService: FCMProvider, private schedulerEvent: SchedulerEvent) {}

  @OnEvent(FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM)
  async createReservationUsageAlarm(data: CreateReservationUsageAlarm) {
    const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), data.time);
    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      this.fcmService.sendMessage({
        title: '예약 사용 알림',
        body: `${data.nickname}님! 예약하신 ${data.spaceName} 사용 시작 시간 [${data.year}.${data.month}.${data.day} ${data.time}시] 까지 1시간 남았어요!`,
        imageUrl: 'test url',
        token: data.pushToken,
      });
    });
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM)
  async createReviewRecommendAlarm(data: CreateReservationUsageAlarm) {
    this.fcmService.sendMessage({
      title: '리뷰를 달아주세요!',
      body: `${data.nickname}님! ${data.spaceName}에서 즐거운 시간 보내셨나요? 리뷰를 남겨보세요!`,
      imageUrl: 'test url',
      token: data.pushToken,
    });
  }
  @OnEvent(FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM)
  async createCouponDurationAlarm(data: CreateCouponDurationAlarm) {
    this.fcmService.sendMessage({
      title: '쿠폰 기한 만료 전 알림',
      body: `${data.nickname}님! 사용 만료까지 얼마 안남은 쿠폰이 있어요! 쿠폰함에서 확인해보세요!`,
      imageUrl: 'test url',
      token: data.pushToken,
    });
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM)
  async createQnAAnswerAlarm(data: CreateQnAAnswerAlarm) {
    this.fcmService.sendMessage({
      title: 'Q&A 알림',
      body: `${data.nickname}님! ${data.spaceName}에 문의하신 내용에 대한 답변이 올라왔어요! 확인해보세요.`,
      imageUrl: 'test url',
      token: data.pushToken,
    });
  }
}
