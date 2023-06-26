export interface SendPushMessage {
  token: string;
  body: string;
  title: string;
  imageUrl: string;
}

export interface BaseAlarmProps {
  pushToken: string;
  nickname: string;
}

export interface CreateReservationUsageAlarm extends BaseAlarmProps {
  date: string;
  time: number;
}
export interface CreateReviewRecommendAlarm extends BaseAlarmProps {
  spaceName: string;
}

export type CreateCouponDurationAlarm = BaseAlarmProps;
export interface CreateQnAAnswerAlarm extends BaseAlarmProps {
  spaceName: string;
}
