export const MESSAGE_EVENT_NAME = {
  //NOTE: 공간 사용 예정 시간까지 1시간! + 카카오
  CREATE_RESERVATION_USAGE_ALARM: Symbol('fcm.create.reservation.usage.alarm'),
  //NOTE: 리뷰 권장 알림
  CREATE_REVIEW_RECOMMEND_ALARM: Symbol('fcm.create.review.recommend.alarm'),
  //NOTE: 쿠폰 기한 만료 전 알림
  CREATE_COUPON_DURATION_ALARM: Symbol('fcm.create.coupon.duration.alarm'),
  //NOTE: Q&A 답변 알림 + 카카오
  CREATE_QNA_ANSWER_ALARM: Symbol('fcm.create.qna.answer.alarm'),
  //NOTE: 마케팅 관련 알림 - 기획전
  CREATE_MARKETING_ALARM: Symbol('fcm.create.marketing.alarm'),
  //NOTE: 리뷰 답변 알림
  CREATE_REVIEW_ANSWER_ALARM: Symbol('fcm.create.review.answer.alarm'),
  //NOTE: 예약 취소 알림 - 게스트가 예약 취소 + 카카오
  CREATE_RESERVATION_GUEST_CANCELED_ALARM: Symbol('fcm.create.reservation.guest.canceled.alarm'),
  //NOTE: 예약 취소 알림 - 호스트가 예약 취소 + 카카오
  CREATE_RESERVATION_HOST_CANCELED_ALARM: Symbol('fcm.create.reservation.host.canceled.alarm'),
  //NOTE: 예약 취소 알림 - 12시간 뒤 자동 취소 + 카카오
  CREATE_RESERVATION_AUTO_CANCELED_ALARM: Symbol('fcm.create.reservation.auto.canceled.alarm'),
  //NOTE: 예약 거절 알림
  CREATE_RESERVATION_REJECTED_ALARM: Symbol('fcm.create.reservation.rejected.alarm'),
  //NOTE: 예약 신청 승인 알림
  CREATE_RESERVATION_ACCEPTED_ALARM: Symbol('fcm.create.reservation.accepted.alarm'),
  //NOTE: 결제 완료 알림
  CREATE_PAYMENT_SUCCESS_ALARM: Symbol('fcm.create.payment.success.alarm'),
  SEND_ALARM: Symbol('fcm.send.alarm'),
  SEND_ALARMS: Symbol('fcm.send.alarms'),
  SEND_SCHEDULE_ALARM: Symbol('fcm.send.schedule.alarm'),
  SEND_SCHEDULE_ALARMS: Symbol('fcm.send.schedule.alarms'),
  DELETE_ALARM: Symbol('fcm.delete.alarm'),
};

export const ALARM_TALK_ID = {
  RESERVATION_GUEST_CANCELED: 'KA01TP230919080922180ymYjHuaunqh',
  QNA_ANSWER: 'KA01TP2309181006228726dThp5u89Vt',
  RESERVATION_HOST_CANCELED: 'KA01TP2309181006228726dThp5u89Vt',
  RESERVATION_AUTO_CANCELED: 'KA01TP230918095953947ihqiZv53de9',
  RESERVATION_REJECTED: 'KA01TP230918095613070NRBpM84iOi6',
  RESERVATION_APPROVED: 'KA01TP230918094823575CbQs0X9aCQx',
  PAYMENT_SUCCESS: 'KA01TP230918094215617MAXd728wu1o',
  RESERVATION_USAGE: 'KA01TP2309040842066163nd3ZdQzLt1',
};
