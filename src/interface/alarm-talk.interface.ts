export interface ReservationSuccessAlarmTalkVariable {
  userName: string;
  spaceTitle: string;
  reservationDate: string;
  reservationTime: string;
}

export type AlarmTalkVariable<
  T extends Record<string, any>,
  P extends string = keyof T extends string ? keyof T : any
> = {
  [K in P as `#{${K}}`]: string;
};
