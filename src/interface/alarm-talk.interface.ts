export interface AlarmTalkLinkProps {
  endpoint: string;
  link: string;
}

export type AlarmTalkVariable<
  T extends Record<string, any>,
  P extends string = keyof T extends string ? keyof T : any
> = {
  [K in P as `#{${K}}`]: T[K];
};

export interface ReservationSuccessAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
  price: number;
}

export interface PaymentSuccessAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
}

export interface ReservationApprovedAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
  price: number;
}

export interface ReservationRejectedAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
}

export interface ReservationAutoCanceledAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
}

export interface ReservationGuestCanceledAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reason: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
}

export interface ReservationHostCanceledAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
  productName: string;
  reservationDate: string;
  startAt: number;
  userCount: number;
}

export interface QnAAnswerAlarmTalk extends AlarmTalkLinkProps {
  nickname: string;
  spaceName: string;
}

export type ReservationSuccessAlarmTalkPayload = AlarmTalkVariable<ReservationSuccessAlarmTalk>;
export type PaymentSuccessAlarmTalkPayload = AlarmTalkVariable<PaymentSuccessAlarmTalk>;
export type ReservationApprovedAlarmTalkPayload = AlarmTalkVariable<ReservationApprovedAlarmTalk>;
export type ReservationRejectedAlarmTalkPayload = AlarmTalkVariable<ReservationRejectedAlarmTalk>;
export type ReservationAutoCanceledAlarmTalkPayload = AlarmTalkVariable<ReservationAutoCanceledAlarmTalk>;
export type ReservationGuestCanceledAlarmTalkPayload = AlarmTalkVariable<ReservationGuestCanceledAlarmTalk>;
export type ReservationHostCanceledAlarmTalkPayload = AlarmTalkVariable<ReservationHostCanceledAlarmTalk>;
export type QnAAnswerAlarmTalkPayload = AlarmTalkVariable<QnAAnswerAlarmTalk>;
