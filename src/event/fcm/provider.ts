import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { nanoid } from 'nanoid';

import { getDateDiff } from '@/common/date';
import { FCMProvider } from '@/common/fcm';
import { PrismaService } from '@/database/prisma.service';
import {
  CreateCouponDurationAlarm,
  CreateMarketingAlarm,
  CreateQnAAnswerAlarm,
  CreateReservationUsageAlarm,
  CreateReviewRecommendAlarm,
  SendAlarm,
  SendAlarmTarget,
  SendPushMessage,
  SendScheduleAlarm,
} from '@/interface/fcm.interface';
import { CreateAlarmDTO } from '@/modules/alarm/dto';

import { SchedulerEvent } from '../scheduler';

import { FCM_EVENT_NAME } from './constants';

@Injectable()
export class FCMEventProvider {
  constructor(
    private readonly database: PrismaService,
    private readonly fcmService: FCMProvider,
    private schedulerEvent: SchedulerEvent
  ) {}

  @OnEvent(FCM_EVENT_NAME.SEND_ALARM)
  async sendAlarm(user: SendAlarmTarget, data: SendAlarm) {
    const alarm = await this.createAlarm({
      title: data.title,
      content: data.body,
      isPush: true,
      userId: user.userId,
    });
    await this.fcmService.sendMessage({
      ...data,
      token: user.pushToken,
    });
    await this.updatePushedAlarm(alarm.id);
  }

  @OnEvent(FCM_EVENT_NAME.SEND_ALARMS)
  async sendAlarms(users: SendAlarmTarget[], data: SendAlarm) {
    await Promise.all(
      users.map(async (user) => {
        this.sendAlarm(user, data);
      })
    );
  }

  @OnEvent(FCM_EVENT_NAME.SEND_SCHEDULE_ALARM)
  async sendScheduleAlarm(user: SendAlarmTarget, data: SendScheduleAlarm) {
    const date = new Date();
    const alarm = await this.createAlarm({
      title: data.title,
      content: data.body,
      isPush: true,
      userId: user.userId,
      ...(data.spaceId && {}),
    });
    this.schedulerEvent.createSchedule(`${user.userId}_${date.getTime()}_${nanoid(2)}`, data.targetDate, async () => {
      await this.fcmService.sendMessage({
        ...data,
        token: user.pushToken,
      });
      await this.updatePushedAlarm(alarm.id);
    });
  }

  @OnEvent(FCM_EVENT_NAME.SEND_SCHEDULE_ALARMS)
  async sendScheduleAlarms(users: SendAlarmTarget[], data: SendScheduleAlarm) {
    await Promise.all(
      users.map(async (user) => {
        this.sendScheduleAlarm(user, data);
      })
    );
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM)
  async createReservationUsageAlarm(data: CreateReservationUsageAlarm) {
    const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), data.time - 1);
    const alarmData = {
      title: '예약 사용 알림',
      body: `${data.nickname}님! 예약하신 ${data.spaceName} 사용 시작 시간 [${data.year}.${data.month}.${data.day} ${data.time}시] 까지 1시간 남았어요!`,
      token: data.pushToken,
    };

    //TODO: 알람 링크 연결
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      isPush: true,
      userId: data.userId,
      alarmAt: targetDate,
    });

    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      await this.sendAlarmWithUpdate(alarm.id, alarmData);
    });
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM)
  async createReviewRecommendAlarm(data: CreateReviewRecommendAlarm) {
    const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), 4, 0, 0);
    const alarmData = {
      title: '리뷰를 달아주세요!',
      body: `${data.nickname}님! ${data.spaceName}에서 즐거운 시간 보내셨나요? 리뷰를 남겨보세요!`,
      token: data.pushToken,
    };
    //TODO: 알람 링크 연결
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      isPush: true,
      userId: data.userId,
    });
    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      await this.sendAlarmWithUpdate(alarm.id, alarmData);
    });
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_COUPON_DURATION_ALARM)
  async createCouponDurationAlarm(data: CreateCouponDurationAlarm) {
    const targetDate = data.dueDate;
    targetDate.setUTCDate(targetDate.getUTCDate() - 5);
    //TODO: 쿠폰함 링크 연결
    const alarmData = {
      title: '쿠폰 기한 만료 전 알림',
      body: `${data.nickname}님! 사용 만료까지 얼마 안남은 쿠폰이 있어요! 쿠폰함에서 확인해보세요!`,
      token: data.pushToken,
    };
    //TODO: 알람 링크 연결
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      isPush: true,
      userId: data.userId,
    });
    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      await this.sendAlarmWithUpdate(alarm.id, alarmData);
    });
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_QNA_ANSWER_ALARM)
  async createQnAAnswerAlarm(data: CreateQnAAnswerAlarm) {
    const alarmData = {
      title: 'Q&A 알림',
      body: `${data.nickname}님! ${data.spaceName}에 문의하신 내용에 대한 답변이 올라왔어요! 확인해보세요.`,
      token: data.pushToken,
    };
    //TODO: 알람 링크 연결
    const alarm = await this.createAlarm({
      ...data,
      title: alarmData.title,
      content: alarmData.body,
      isPush: true,
      userId: data.userId,
    });
    await this.fcmService.sendMessage(alarmData);
    await this.updatePushedAlarm(alarm.id);
  }

  @OnEvent(FCM_EVENT_NAME.CREATE_MARKETING_ALARM)
  async createMarketIngAlarm(data: CreateMarketingAlarm) {
    const currentDate = new Date();
    const targetDate = new Date(data.startAt);
    targetDate.setDate(targetDate.getDate() - 1);

    const alarmData: SendPushMessage = {
      title: `루프루팡과 함께 ${data.title}을 즐겨봐요`,
      body: data.title,
      link: '',
      token: data.pushToken,
    };

    const alarm = await this.createAlarm({
      ...data,
      title: alarmData.title,
      content: alarmData.body,
      isPush: true,
      userId: data.userId,
      exhibitionId: data.exhibitionId,
    });

    const dateDiff = getDateDiff(currentDate, targetDate);

    if (dateDiff < 0) {
      await this.sendAlarmWithUpdate(alarm.id, alarmData);
    } else {
      this.schedulerEvent.createSchedule(`${data.userId}_${data.exhibitionId}`, targetDate, async () => {
        await this.sendAlarmWithUpdate(alarm.id, alarmData);
      });
    }
  }

  @OnEvent(FCM_EVENT_NAME.DELETE_ALARM)
  async deleteAlarm(jobId: string) {
    this.schedulerEvent.deleteSchedule(jobId);
  }

  async sendAlarmWithUpdate(alarmId: string, data: SendPushMessage) {
    await this.fcmService.sendMessage(data);
    await this.updatePushedAlarm(alarmId);
  }

  async createAlarm(data: CreateAlarmDTO) {
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

  async updatePushedAlarm(id: string) {
    await this.database.userAlarm.update({
      where: {
        id,
      },
      data: {
        isPushed: true,
      },
    });
  }
}
