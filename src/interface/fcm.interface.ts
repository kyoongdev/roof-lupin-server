export interface SendPushMessage {
  token?: string;
  body: string;
  title: string;
  link?: string;
  isAlarmAccepted: boolean;
}
export interface SendMessage {
  token?: string;
  body: string;
  title: string;
  link?: string;
}

export interface BaseAlarmProps {
  nickname?: string;
  userId: string;
}

export interface CreateReservationUsageAlarm extends BaseAlarmProps {
  jobId: string;
  year: number;
  month: number;
  day: number;
  time: number;
  spaceName: string;
}
export interface CreateReviewRecommendAlarm extends BaseAlarmProps {
  jobId: string;
  year: number;
  month: number;
  day: number;
  spaceName: string;
}

export interface CreateCouponDurationAlarm extends BaseAlarmProps {
  jobId: string;
  dueDate: Date;
}
export interface CreateQnAAnswerAlarm extends BaseAlarmProps {
  spaceName: string;
  pushToken: string;
  isAlarmAccepted: boolean;
}

export interface CreateMarketingAlarm extends BaseAlarmProps {
  title: string;
  startAt: Date;
  exhibitionId: string;
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
