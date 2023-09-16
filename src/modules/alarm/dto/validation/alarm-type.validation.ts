import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { Property } from 'cumuco-nestjs';

export const ALARM_TYPE = {
  SPACE_TIME: 1,
  RESERVATION_APPROVED: 2,
  RESERVATION_REJECTED: 3,
  RESERVATION_AUTO_CANCELED: 4,
  RESERVATION_HOST_CANCELED: 5,
  REVIEW_RECOMMEND: 6,
  COUPON_DURATION: 7,
  QNA: 8,
  REVIEW_ANSWER: 9,
  MARKETING_EXHIBITION: 10,
} as const;

export const alarmTypeNumberToString = (alarmType: number): keyof typeof ALARM_TYPE | null => {
  if (alarmType === 1) {
    return 'SPACE_TIME';
  } else if (alarmType === 2) {
    return 'RESERVATION_APPROVED';
  } else if (alarmType === 3) {
    return 'RESERVATION_REJECTED';
  } else if (alarmType === 4) {
    return 'RESERVATION_AUTO_CANCELED';
  } else if (alarmType === 5) {
    return 'RESERVATION_HOST_CANCELED';
  } else if (alarmType === 6) {
    return 'REVIEW_RECOMMEND';
  } else if (alarmType === 7) {
    return 'COUPON_DURATION';
  } else if (alarmType === 8) {
    return 'QNA';
  } else if (alarmType === 9) {
    return 'REVIEW_ANSWER';
  } else if (alarmType === 10) {
    return 'MARKETING_EXHIBITION';
  } else {
    return null;
  }
};

export const AlarmTypeResponseTransform = () => Transform(({ value }) => alarmTypeNumberToString(value));

export const AlarmTypeResDecorator = (nullable = false) =>
  applyDecorators(
    AlarmTypeResponseTransform(),
    Property({
      apiProperty: { description: '알람 타입', type: 'string', example: Object.keys(ALARM_TYPE).join('|'), nullable },
    })
  );
