import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { nanoid } from 'nanoid';
import { SolapiMessageService } from 'solapi';

import { getDateDiff } from '@/common/date';
import { PrismaService } from '@/database/prisma.service';
import type {
  PaymentSuccessAlarmTalkPayload,
  QnAAnswerAlarmTalkPayload,
  ReservationApprovedAlarmTalkPayload,
  ReservationAutoCanceledAlarmTalkPayload,
  ReservationGuestCanceledAlarmTalkPayload,
  ReservationHostCanceledAlarmTalkPayload,
  ReservationRejectedAlarmTalkPayload,
  ReservationUsageAlarmTalkPayload,
} from '@/interface/alarm-talk.interface';
import type {
  BaseSendMessage,
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
  SendPushMessage,
  SendScheduleAlarm,
} from '@/interface/message.interface';
import { logger } from '@/log';
import { CreateAlarmDTO } from '@/modules/alarm/dto';
import { ALARM_TYPE } from '@/modules/alarm/dto/validation/alarm-type.validation';
import { PushTokenDTO } from '@/modules/user/dto';
import { DynamicLinkProvider } from '@/utils';
import { MessageProvider } from '@/utils/fcm';

import { SchedulerEvent } from '../scheduler';

import { ALARM_TALK_ID, MESSAGE_EVENT_NAME } from './constants';

@Injectable()
export class MessageEventProvider {
  private readonly solaapi = new SolapiMessageService(
    this.configService.get('SOLAPI_API_KEY'),
    this.configService.get('SOLAPI_API_SECRET')
  );
  constructor(
    private readonly database: PrismaService,
    private readonly fcmService: MessageProvider,

    private schedulerEvent: SchedulerEvent,
    private readonly dynamicLinkProvider: DynamicLinkProvider,
    private readonly configService: ConfigService
  ) {}

  @OnEvent(MESSAGE_EVENT_NAME.SEND_ALARM)
  async sendAlarm(user: SendAlarmTarget, data: SendAlarm) {
    const alarm = await this.createAlarm({
      title: data.title,
      content: data.body,
      isPush: true,
      userId: user.userId,
      alarmAt: new Date(),
      alarmType: data.alarmType,
    });
    await this.fcmService.sendMessage({
      ...data,
      token: user.pushToken,
    });
    await this.updatePushedAlarm(alarm.id);
  }

  @OnEvent(MESSAGE_EVENT_NAME.SEND_ALARMS)
  async sendAlarms(users: SendAlarmTarget[], data: SendAlarm) {
    await Promise.all(
      users.map(async (user) => {
        this.sendAlarm(user, data);
      })
    );
  }

  @OnEvent(MESSAGE_EVENT_NAME.SEND_SCHEDULE_ALARM)
  async sendScheduleAlarm(user: SendAlarmTarget, data: SendScheduleAlarm) {
    const date = new Date();
    const alarmData: BaseSendMessage = {
      title: data.title,
      body: data.body,
      link: data.link,
    };
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      link: alarmData.link,
      isPush: true,
      userId: user.userId,
      alarmAt: data.targetDate,
      alarmType: data.alarmType,
    });
    this.schedulerEvent.createSchedule(`${user.userId}_${date.getTime()}_${nanoid(2)}`, data.targetDate, async () => {
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    });
  }

  @OnEvent(MESSAGE_EVENT_NAME.SEND_SCHEDULE_ALARMS)
  async sendScheduleAlarms(users: SendAlarmTarget[], data: SendScheduleAlarm) {
    await Promise.all(
      users.map(async (user) => {
        this.sendScheduleAlarm(user, data);
      })
    );
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_USAGE_ALARM)
  async createReservationUsageAlarm(data: CreateReservationUsageAlarm) {
    const targetDate = new Date(Number(data.year), Number(data.month) - 1, Number(data.day), data.startAt - 1);
    const alarmData: BaseSendMessage = {
      title: '예약 사용 알림',
      body: `${data.nickname}님! 예약하신 ${data.spaceName} 사용 시작 시간 [${data.year}.${data.month}.${data.day} ${data.startAt}시] 까지 1시간 남았어요!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/reservations/${data.reservationId}`),
    };

    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      //TODO: 알람 링크 연결
      const alarm = await this.createAlarm({
        title: alarmData.title,
        content: alarmData.body,
        isPush: true,
        userId: data.userId,
        alarmAt: targetDate,
        alarmType: ALARM_TYPE.SPACE_TIME,
        link: alarmData.link,
      });
      const user = await this.getUser(data.userId);
      if (!user) return;
      if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
        const reservation = await this.getReservation(data.reservationId);
        if (reservation)
          await this.sendKakaoMessage<ReservationUsageAlarmTalkPayload>(
            user.phoneNumber,
            ALARM_TALK_ID.RESERVATION_USAGE,
            {
              '#{endpoint}': '/my-page/reservations',
              '#{link}': this.configService.get('CLIENT_URL'),
              '#{nickname}': data.nickname,
              '#{price}': reservation.totalCost,
              '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
              '#{spaceName}': reservation.space.title,
              '#{startAt}': data.startAt,
              '#{userCount}': reservation.userCount,
            }
          );
      }

      if (user.setting.checkIsPushAlarmAccepted()) {
        await this.sendAlarmWithUpdate(alarm.id, {
          ...alarmData,
          token: user.pushToken,
        });
      }
    });
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_REVIEW_RECOMMEND_ALARM)
  async createReviewRecommendAlarm(data: CreateReviewRecommendAlarm) {
    const targetDate = new Date(data.year, data.month - 1, data.day + 1, 4, 0, 0);
    const alarmData: BaseSendMessage = {
      title: '리뷰를 달아주세요!',
      body: `${data.nickname}님! ${data.spaceName}에서 즐거운 시간 보내셨나요? 리뷰를 남겨보세요!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/reservations/${data.reservationId}/write-review`),
    };

    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      const space = await this.database.space.findUnique({
        where: {
          id: data.spaceId,
        },
        select: {
          thumbnail: true,
        },
      });
      const alarm = await this.createAlarm({
        title: alarmData.title,
        content: alarmData.body,
        isPush: true,
        userId: data.userId,
        alarmAt: targetDate,
        alarmType: ALARM_TYPE.REVIEW_RECOMMEND,
        thumbnail: space.thumbnail,
        link: alarmData.link,
      });
      const user = await this.getUser(data.userId);
      if (!user || !user.setting.checkIsPushAlarmAccepted()) return;
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    });
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_COUPON_DURATION_ALARM)
  async createCouponDurationAlarm(data: CreateCouponDurationAlarm) {
    const targetDate = new Date(data.dueDate);
    targetDate.setUTCDate(targetDate.getUTCDate() - 5);
    const alarmData = {
      title: '쿠폰 기한 만료 전 알림',
      body: `${data.nickname}님! 사용 만료까지 얼마 안남은 쿠폰이 있어요! 쿠폰함에서 확인해보세요!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/my-page/coupons`),
    };

    this.schedulerEvent.createSchedule(data.jobId, targetDate, async () => {
      const alarm = await this.createAlarm({
        title: alarmData.title,
        content: alarmData.body,
        isPush: true,
        userId: data.userId,
        alarmAt: targetDate,
        alarmType: ALARM_TYPE.COUPON_DURATION,
        link: alarmData.link,
      });
      const user = await this.getUser(data.userId);
      if (!user || !user.setting.checkIsPushAlarmAccepted()) return;
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    });
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_QNA_ANSWER_ALARM)
  async createQnAAnswerAlarm(data: CreateQnAAnswerAlarm) {
    const alarmData: BaseSendMessage = {
      title: 'Q&A 관련 알림',
      body: `${data.nickname}님! ${data.spaceName}에 문의하신 내용에 대한 답변이 올라왔어요! 확인해보세요.!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/spaces/${data.spaceId}/qnas`),
    };

    try {
      const alarm = await this.createAlarm({
        title: alarmData.title,
        content: alarmData.body,
        isPush: true,
        userId: data.userId,
        alarmAt: new Date(),
        alarmType: ALARM_TYPE.QNA,
        link: alarmData.link,
      });
      const user = await this.getUser(data.userId);
      if (!user) return;
      if (user.setting.checkIsPushAlarmAccepted()) {
        await this.fcmService.sendMessage({
          ...alarmData,
          token: user.pushToken,
        });
        await this.updatePushedAlarm(alarm.id);
      }
      if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
        await this.sendKakaoMessage<QnAAnswerAlarmTalkPayload>(user.phoneNumber, ALARM_TALK_ID.QNA_ANSWER, {
          '#{endpoint}': `/spaces/${data.spaceId}/qnas`,
          '#{link}': this.configService.get('CLIENT_URL'),
          '#{nickname}': data.nickname,
          '#{spaceName}': data.spaceName,
        });
      }
    } catch (err) {
      logger.error(err);
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_MARKETING_ALARM)
  async createMarketIngAlarm(data: CreateMarketingExhibitionAlarm) {
    const currentDate = new Date();
    const targetDate = new Date(data.startAt);
    targetDate.setDate(targetDate.getDate() - 1);

    const alarmData = {
      title: `루프루팡과 함께 ${data.title}을 즐겨봐요`,
      body: data.title,
      //TODO: 기획전 페이지
      link: 'this.dynamicLinkProvider.createDynamicLink(`/reservations/${data.reservationId}`)',
    };
    const dateDiff = getDateDiff(currentDate, targetDate);

    if (dateDiff <= 1) {
      const alarm = await this.createAlarm({
        title: alarmData.title,
        content: alarmData.body,
        isPush: true,
        link: alarmData.link,
        userId: data.userId,
        alarmType: ALARM_TYPE.MARKETING_EXHIBITION,
        alarmAt: dateDiff <= 1 ? new Date() : targetDate,
      });
      const user = await this.getUser(data.userId);
      if (!user) return;
      if (user.setting.checkIsPushAlarmAccepted())
        await this.sendAlarmWithUpdate(alarm.id, {
          ...alarmData,
          token: user.pushToken,
        });
    } else {
      this.schedulerEvent.createSchedule(`${data.userId}_${data.exhibitionId}`, targetDate, async () => {
        const alarm = await this.createAlarm({
          title: alarmData.title,
          content: alarmData.body,
          userId: data.userId,
          alarmType: ALARM_TYPE.MARKETING_EXHIBITION,
          alarmAt: dateDiff <= 1 ? new Date() : targetDate,
          isPush: true,
          link: alarmData.link,
        });

        const user = await this.getUser(data.userId);
        if (!user || !user.pushToken || !user.setting.checkIsPushAlarmAccepted()) return;

        await this.sendAlarmWithUpdate(alarm.id, {
          ...alarmData,
          token: user.pushToken,
        });
      });
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_REVIEW_ANSWER_ALARM)
  async createReviewAnswerAlarm(data: CreateReviewAnswerAlarm) {
    const alarmData: BaseSendMessage = {
      title: '등록하신 리뷰에 답변이 등록됐어요!',
      body: `${data.nickname}님! ${data.spaceName}에 등록하신 리뷰에 답변이 올라왔어요! 확인해보세요!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/spaces/${data.spaceId}/reviews`),
    };
    const alarm = await this.createAlarm({
      title: alarmData.title,
      link: alarmData.link,
      alarmType: ALARM_TYPE.REVIEW_ANSWER,
      alarmAt: new Date(),
      content: alarmData.body,
      userId: data.userId,
      isPush: true,
    });
    const user = await this.getUser(data.userId);
    if (user && user.setting.checkIsPushAlarmAccepted()) {
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_GUEST_CANCELED_ALARM)
  async createReservationGuestCanceledAlarm(data: CreateReservationGuestCanceledAlarm) {
    const user = await this.getUser(data.userId);
    if (user && user.setting.checkIsKakaoTalkAlarmAccepted()) {
      const reservation = await this.getReservation(data.reservationId);

      if (!reservation) return;

      this.sendKakaoMessage<ReservationGuestCanceledAlarmTalkPayload>(
        user.phoneNumber,
        ALARM_TALK_ID.RESERVATION_GUEST_CANCELED,
        {
          '#{endpoint}': '/my-page/reservations',
          '#{link}': this.configService.get('CLIENT_URL'),
          '#{nickname}': data.nickname,
          '#{productName}': reservation.rentalTypes[0].rentalType.name,
          '#{reason}': data.reason,
          '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
          '#{spaceName}': data.spaceName,
          '#{startAt}': reservation.rentalTypes[0].startAt,
          '#{userCount}': reservation.userCount,
        }
      );
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_HOST_CANCELED_ALARM)
  async createReservationHostCanceledAlarm(data: CreateReservationHostCanceledAlarm) {
    const reservation = await this.getReservation(data.reservationId);
    if (!reservation) return;
    const alarmData: BaseSendMessage = {
      title: '예약 취소 알림',
      body: `${data.nickname}님! ${data.spaceName} ${reservation.rentalTypes[0].rentalType.name} 예약이 취소되었습니다.
      취소사유 : 호스트의 예약 거절 상품명 : ${reservation.rentalTypes[0].rentalType.name},
      예약 날짜 : ${reservation.year}.${reservation.month}.${reservation.day},
      예약 시간 : ${reservation.rentalTypes[0].startAt},
      예약 인원 : ${reservation.userCount}명
      취소 내역 확인 : `,
    };
    const user = await this.getUser(data.userId);
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      alarmType: ALARM_TYPE.RESERVATION_HOST_CANCELED,
      alarmAt: new Date(),
      isPush: true,
      link: this.dynamicLinkProvider.createDynamicLink(`/my-page/reservations`),
      userId: data.userId,
    });
    if (user) {
      if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
        await this.sendKakaoMessage<ReservationHostCanceledAlarmTalkPayload>(
          user.phoneNumber,
          ALARM_TALK_ID.RESERVATION_HOST_CANCELED,
          {
            '#{endpoint}': '/my-page/reservations',
            '#{link}': this.configService.get('CLIENT_URL'),
            '#{nickname}': data.nickname,
            '#{productName}': reservation.rentalTypes[0].rentalType.name,
            '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
            '#{spaceName}': data.spaceName,
            '#{startAt}': reservation.rentalTypes[0].startAt,
            '#{userCount}': reservation.userCount,
          }
        );
      }
      if (user.setting.checkIsPushAlarmAccepted()) {
        await this.sendAlarmWithUpdate(alarm.id, {
          ...alarmData,
          token: user.pushToken,
        });
      }
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_AUTO_CANCELED_ALARM)
  async createReservationAutoCanceledAlarm(data: CreateReservationAutoCanceledAlarm) {
    const reservation = await this.getReservation(data.reservationId);

    if (!reservation) return;
    const alarmData: BaseSendMessage = {
      title: '예약 취소 알림',
      body: `${data.nickname}님! ${data.spaceName} ${reservation.rentalTypes[0].rentalType.name} 예약이 취소되었습니다.
      취소 사유 : 12시간 내 결제 미진행
      `,
      link: this.dynamicLinkProvider.createDynamicLink(`/my-page/reservations`),
    };
    const approvedAt = data.approvedAt;
    approvedAt.setHours(approvedAt.getHours() + 12);
    this.schedulerEvent.createSchedule(
      `${new Date().getTime()}_${data.reservationId}_${data.userId}`,
      approvedAt,
      async () => {
        const alarm = await this.createAlarm({
          title: alarmData.title,
          content: alarmData.body,
          userId: data.userId,
          alarmType: ALARM_TYPE.RESERVATION_AUTO_CANCELED,
          alarmAt: approvedAt,
          isPush: true,
          link: alarmData.link,
        });
        const user = await this.getUser(data.userId);
        if (!user) return;
        if (user.setting.checkIsPushAlarmAccepted()) {
          await this.sendAlarmWithUpdate(alarm.id, {
            ...alarmData,
            token: user.pushToken,
          });
        }
        if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
          await this.sendKakaoMessage<ReservationAutoCanceledAlarmTalkPayload>(
            user.phoneNumber,
            ALARM_TALK_ID.RESERVATION_AUTO_CANCELED,
            {
              '#{endpoint}': '/my-page/reservations',
              '#{link}': this.configService.get('CLIENT_URL'),
              '#{nickname}': data.nickname,
              '#{productName}': reservation.rentalTypes[0].rentalType.name,
              '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
              '#{spaceName}': data.spaceName,
              '#{startAt}': reservation.rentalTypes[0].startAt,
              '#{userCount}': reservation.userCount,
            }
          );
        }
      }
    );
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_REJECTED_ALARM)
  async createReservationRejectedAlarm(data: CreateReservationRejectedAlarm) {
    const reservation = await this.getReservation(data.reservationId);
    if (!reservation) return;
    const alarmData: BaseSendMessage = {
      title: '예약 취소 알림',
      body: `${data.nickname}님! ${data.spaceName} ${reservation.rentalTypes[0].rentalType.name} 예약이 취소되었습니다.
      취소 사유 : 호스트의 예약 거절
      상품명 : ${reservation.rentalTypes[0].rentalType.name}
      예약 날짜 : ${reservation.year}.${reservation.month}.${reservation.day}
      예약 시간 : ${reservation.rentalTypes[0].startAt}
      예약 인원 : ${reservation.userCount}명
      취소 내역 확인 : 
      `,
      link: this.dynamicLinkProvider.createDynamicLink(`/my-page/reservations`),
    };
    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      userId: data.userId,
      alarmType: ALARM_TYPE.RESERVATION_REJECTED,
      alarmAt: new Date(),
      isPush: true,
      link: '',
    });
    const user = await this.getUser(data.userId);

    if (!user) return;

    if (user.setting.checkIsPushAlarmAccepted()) {
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    }

    if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
      await this.sendKakaoMessage<ReservationRejectedAlarmTalkPayload>(
        user.phoneNumber,
        ALARM_TALK_ID.RESERVATION_REJECTED,
        {
          '#{endpoint}': '/my-page/reservations',
          '#{link}': this.configService.get('CLIENT_URL'),
          '#{nickname}': data.nickname,
          '#{productName}': reservation.rentalTypes[0].rentalType.name,
          '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
          '#{spaceName}': data.spaceName,
          '#{startAt}': reservation.rentalTypes[0].startAt,
          '#{userCount}': reservation.userCount,
        }
      );
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_RESERVATION_ACCEPTED_ALARM)
  async createReservationAcceptedAlarm(data: CreateReservationAcceptedAlarm) {
    const reservation = await this.getReservation(data.reservationId);
    if (!reservation) return;

    const alarmData: BaseSendMessage = {
      title: '예약 신청 승인 알림',
      body: `${data.nickname}님! ${data.spaceName} ${reservation.rentalTypes[0].rentalType.name} 예약이 승인되었어요. 결제까지 진행되어야 예약이 확정돼요!`,
      link: this.dynamicLinkProvider.createDynamicLink(`/my-page/reservations`),
    };

    const alarm = await this.createAlarm({
      title: alarmData.title,
      content: alarmData.body,
      alarmType: ALARM_TYPE.RESERVATION_APPROVED,
      userId: data.userId,
      alarmAt: new Date(),
      isPush: true,
      link: alarmData.link,
    });

    const user = await this.getUser(data.userId);

    if (!user) return;

    if (user.setting.checkIsPushAlarmAccepted()) {
      await this.sendAlarmWithUpdate(alarm.id, {
        ...alarmData,
        token: user.pushToken,
      });
    }

    if (user.setting.checkIsKakaoTalkAlarmAccepted()) {
      await this.sendKakaoMessage<ReservationApprovedAlarmTalkPayload>(
        user.phoneNumber,
        ALARM_TALK_ID.RESERVATION_APPROVED,
        {
          '#{endpoint}': '/my-page/reservations',
          '#{link}': this.configService.get('CLIENT_URL'),
          '#{nickname}': data.nickname,
          '#{price}': reservation.totalCost,
          '#{productName}': reservation.rentalTypes[0].rentalType.name,
          '#{reservationDate}': `${reservation.year}.${reservation.month}.${reservation.day}`,
          '#{spaceName}': data.spaceName,
          '#{startAt}': reservation.rentalTypes[0].startAt,
          '#{userCount}': reservation.userCount,
        }
      );
    }
  }

  @OnEvent(MESSAGE_EVENT_NAME.DELETE_ALARM)
  async deleteAlarm(jobId: string) {
    this.schedulerEvent.deleteSchedule(jobId);
  }

  @OnEvent(MESSAGE_EVENT_NAME.CREATE_PAYMENT_SUCCESS_ALARM)
  async createPaymentSuccessAlarm(data: CreatePaymentSuccessAlarm) {
    const reservation = await this.getReservation(data.reservationId);
    if (!reservation) return;

    this.sendKakaoMessage<PaymentSuccessAlarmTalkPayload>(data.phoneNumber, ALARM_TALK_ID.PAYMENT_SUCCESS, {
      '#{endpoint}': '/my-page/reservations',
      '#{link}': this.configService.get('CLIENT_URL'),
      '#{nickname}': data.nickname,
      '#{productName}': reservation.rentalTypes[0].rentalType.name,
      '#{spaceName}': data.spaceName,
    });
  }
  async sendKakaoMessage<T>(targetPhoneNumber: string, templateId: string, variables?: T) {
    if (this.configService.get('NODE_ENV') !== 'prod') return;
    try {
      await this.solaapi.send({
        to: targetPhoneNumber,
        kakaoOptions: {
          pfId: this.configService.get('SOLAPI_PFID'),
          templateId,
          variables: variables ?? {},
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sendAlarmWithUpdate(alarmId: string, data: SendPushMessage) {
    await this.fcmService.sendMessage(data);

    await this.updatePushedAlarm(alarmId);
  }

  async createAlarm(data: CreateAlarmDTO) {
    const { userId, ...rest } = data;

    return await this.database.userAlarm.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
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

  async getUser(id: string) {
    const user = await this.database.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        setting: true,
        socials: true,
      },
    });
    return new PushTokenDTO(user);
  }

  async getReservation(id: string) {
    const reservation = await this.database.reservation.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        space: true,
        rentalTypes: {
          include: {
            rentalType: true,
          },
        },
      },
    });
    return reservation;
  }
}
