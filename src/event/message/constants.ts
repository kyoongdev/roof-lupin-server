export const MESSAGE_EVENT_NAME = {
  //NOTE: 공간 사용 예정 시간까지 1시간!
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
  //NOTE: 예약 취소 알림 - 게스트가 예약 취소
  CREATE_RESERVATION_GUEST_CANCELED_ALARM: Symbol('fcm.create.reservation.guest.canceled.alarm'),
  //NOTE: 예약 취소 알림 - 호스트가 예약 취소 + 카카오
  CREATE_RESERVATION_HOST_CANCELED_ALARM: Symbol('fcm.create.reservation.host.canceled.alarm'),
  //NOTE: 예약 취소 알림 - 12시간 뒤 자동 취소 + 카카오
  CREATE_RESERVATION_AUTO_CANCELED_ALARM: Symbol('fcm.create.reservation.auto.canceled.alarm'),
  //NOTE: 예약 거절 알림
  CREATE_RESERVATION_REJECTED_ALARM: Symbol('fcm.create.reservation.rejected.alarm'),
  //NOTE: 예약 신청 승인 알림
  CREATE_RESERVATION_ACCEPTED_ALARM: Symbol('fcm.create.reservation.accepted.alarm'),
  SEND_ALARM: Symbol('fcm.send.alarm'),
  SEND_ALARMS: Symbol('fcm.send.alarms'),
  SEND_SCHEDULE_ALARM: Symbol('fcm.send.schedule.alarm'),
  SEND_SCHEDULE_ALARMS: Symbol('fcm.send.schedule.alarms'),
  DELETE_ALARM: Symbol('fcm.delete.alarm'),
};
