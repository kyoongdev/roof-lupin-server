import { PaymentSuccessAlarmTalk } from './alarm-talk.interface';

export interface BaseSendMessage {
  title: string;
  body: string;
  link?: string;
}

export interface SendPushMessage extends BaseSendMessage {
  token: string;
}
export interface SendMessage extends BaseSendMessage {
  token: string;
}

export interface AlarmSetting {
  isAlarmAccepted: boolean;
  isKakaoTalkAccepted: boolean;
  isPushAccepted: boolean;
}

export interface BaseAlarmProps {
  nickname?: string;
  userId: string;
  setting: AlarmSetting;
}

export interface CreateReservationUsageAlarm extends BaseAlarmProps {
  jobId: string;
  year: number;
  month: number;
  day: number;
  time: number;
  spaceName: string;
  reservationId: string;
}
export interface CreateReviewRecommendAlarm extends BaseAlarmProps {
  jobId: string;
  year: number;
  month: number;
  day: number;
  spaceName: string;
  spaceId: string;
}

export interface CreateCouponDurationAlarm extends BaseAlarmProps {
  jobId: string;
  dueDate: Date;
}
export interface CreateQnAAnswerAlarm extends BaseAlarmProps {
  spaceName: string;
  isAlarmAccepted: boolean;
  spaceId: string;
}

export interface CreateMarketingExhibitionAlarm extends BaseAlarmProps {
  title: string;
  startAt: Date;
  exhibitionId: string;
}

export interface CreateReviewAnswerAlarm extends BaseAlarmProps {
  nickname: string;
  spaceName: string;
  spaceId: string;
  reviewId: string;
}

export interface CreateReservationHostCanceledAlarm extends BaseAlarmProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
  reservationId: string;
}

export interface CreateReservationAutoCanceledAlarm extends BaseAlarmProps {
  nickname: string;
  spaceName: string;
  productName: string;
  approvedAt: Date;
  reservationId: string;
}

export interface CreateReservationGuestCanceledAlarm extends Omit<BaseAlarmProps, 'token'> {
  nickname: string;
  spaceName: string;
  productName: string;
  cancelReason: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
  spaceId: string;
  reservationId: string;
}

export interface CreateReservationRejectedAlarm extends BaseAlarmProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
  reservationId: string;
}

export interface CreateReservationAcceptedAlarm extends BaseAlarmProps {
  nickname: string;
  spaceName: string;
  productName: string;
}

export interface CreatePaymentSuccessAlarm extends Omit<PaymentSuccessAlarmTalk, 'link' | 'endpoint'> {
  userId: string;
  phoneNumber: string;
}

export interface SendAlarmTarget {
  userId: string;
  pushToken: string;
}

export interface SendAlarm {
  body: string;
  title: string;
  link?: string;
  spaceId?: string;
  exhibitionId?: string;
  alarmType?: number;
}
export interface SendScheduleAlarm extends SendAlarm {
  targetDate: Date;
}
