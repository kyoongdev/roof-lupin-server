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
  jobId: string;
  year: string;
  month: string;
  day: string;
  time: number;
  spaceName: string;
}
export interface CreateReviewRecommendAlarm extends BaseAlarmProps {
  spaceName: string;
}

export type CreateCouponDurationAlarm = BaseAlarmProps;
export interface CreateQnAAnswerAlarm extends BaseAlarmProps {
  spaceName: string;
}
