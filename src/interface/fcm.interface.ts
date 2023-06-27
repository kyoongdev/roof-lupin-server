export interface SendPushMessage {
  token: string;
  body: string;
  title: string;
}

export interface BaseAlarmProps {
  pushToken: string;
  nickname: string;
  userId: string;
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
  jobId: string;
  year: string;
  month: string;
  day: string;
  spaceName: string;
}

export interface CreateCouponDurationAlarm extends BaseAlarmProps {
  jobId: string;
  dueDate: Date;
}
export interface CreateQnAAnswerAlarm extends BaseAlarmProps {
  spaceName: string;
}

export interface SendAlarmTarget {
  userId: string;
  pushToken: string;
}

export interface SendAlarm {
  body: string;
  title: string;
}
export interface SendScheduleAlarm extends SendAlarm {
  targetDate: Date;
}
