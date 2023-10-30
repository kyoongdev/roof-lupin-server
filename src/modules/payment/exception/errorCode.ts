import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const PAYMENT_ERROR = {
  PAYMENT_FORBIDDEN: '올바르지 않은 결제 요청입니다.',
  PAYMENT_TOTAL_COST_BAD_REQUEST: '결제 비용을 다시 확인해주세요.',
  PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR: '대여하려는 상품에 문제가 있습니다.',
  PAYMENT_INTERNAL_SERVER_ERROR: '결제에 문제가 생겼습니다.',
  PAYMENT_DATE_BAD_REQUEST: '대여 날짜 혹은 시간을 다시 확인해주세요.',
  PAYMENT_CONFLICT: '예약이 불가합니다.',
  PAYMENT_ORDER_RESULT_ID_BAD_REQUEST: '주문결과를 다시 확인해주세요.',
  PAYMENT_PAY_METHOD_BAD_REQUEST: '결제 수단(pg, toss, kakao)을 다시 확인해주세요.',
  PAYMENT_COUPON_DUE_DATE_EXPIRED: '쿠폰 사용 일자가 지났습니다.',
  PAYMENT_COUPON_DUE_DATE_BEFORE: '쿠폰 사용 일자가 아닙니다.',
  PAYMENT_COUPON_IS_USED: '이미 쿠폰을 사용했습니다.',
  PAYMENT_COUPON_COUNT_ZERO: '사용 가능한 쿠폰이 없습니다.',
  PAYMENT_DISCOUNT_COST_BAD_REQUEST: '할인 비용을 다시 확인해주세요.',
  PAYMENT_SPACE_ID_BAD_REQUEST: '공간 정보가 일치하지 않습니다..',
  PAYMENT_REFUND_FORBIDDEN: '환불 권한이 없습니다.',
  PAYMENT_MUTATION_FORBIDDEN: '수정/삭제 권한이 없습니다.',
  PAYMENT_NOT_COMPLETED: '아직 결제가 완료되지 않았습니다.',
  PAYMENT_ALREADY_REFUNDED: '이미 환불된 결제입니다.',
  PAYMENT_REFUND_DUE_DATE_PASSED: '환불 기간이 지났습니다.',
  PAYMENT_MERCHANT_UID_BAD_REQUEST: '주문번호를 다시 확인해주세요.',
  PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN: '즉시 결제가 불가한 공간입니다.',
  PAYMENT_IMMEDIATE_PAYMENT_REQUIRED: '즉시 결제가 필요한 공간입니다.',
  PAYMENT_NOT_APPROVED: '아직 예약 승인이 되지 않았습니다.',
  PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT: '추가 서비스는 최대 개수가 넘었습니다.',
  PAYMENT_MAX_RESERVATION_DATE: '2시간 전 예약만 가능합니다.',
  PAYMENT_REFUND_AMOUNT: '환불 금액을 다시 확인해주세요.',
  PAYMENT_WITH_DELETED_SPACE: '공간이 존재하지 않습니다.',
} as const;

export const PAYMENT_ERROR_CODE: ErrorCode<typeof PAYMENT_ERROR> = {
  PAYMENT_WITH_DELETED_SPACE: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_WITH_DELETED_SPACE,
  },
  PAYMENT_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: PAYMENT_ERROR.PAYMENT_FORBIDDEN,
  },
  PAYMENT_TOTAL_COST_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_TOTAL_COST_BAD_REQUEST,
  },
  PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: PAYMENT_ERROR.PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR,
  },
  PAYMENT_INTERNAL_SERVER_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: PAYMENT_ERROR.PAYMENT_INTERNAL_SERVER_ERROR,
  },
  PAYMENT_DATE_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_DATE_BAD_REQUEST,
  },
  PAYMENT_CONFLICT: {
    code: HttpStatus.CONFLICT,
    message: PAYMENT_ERROR.PAYMENT_CONFLICT,
  },
  PAYMENT_ORDER_RESULT_ID_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_ORDER_RESULT_ID_BAD_REQUEST,
  },
  PAYMENT_PAY_METHOD_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_PAY_METHOD_BAD_REQUEST,
  },
  PAYMENT_COUPON_DUE_DATE_EXPIRED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_COUPON_DUE_DATE_EXPIRED,
  },
  PAYMENT_COUPON_DUE_DATE_BEFORE: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_COUPON_DUE_DATE_BEFORE,
  },
  PAYMENT_COUPON_IS_USED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_COUPON_IS_USED,
  },
  PAYMENT_COUPON_COUNT_ZERO: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_COUPON_COUNT_ZERO,
  },
  PAYMENT_DISCOUNT_COST_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_DISCOUNT_COST_BAD_REQUEST,
  },
  PAYMENT_SPACE_ID_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_SPACE_ID_BAD_REQUEST,
  },
  PAYMENT_REFUND_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: PAYMENT_ERROR.PAYMENT_REFUND_FORBIDDEN,
  },
  PAYMENT_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: PAYMENT_ERROR.PAYMENT_MUTATION_FORBIDDEN,
  },
  PAYMENT_NOT_COMPLETED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_NOT_COMPLETED,
  },
  PAYMENT_ALREADY_REFUNDED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_ALREADY_REFUNDED,
  },
  PAYMENT_REFUND_DUE_DATE_PASSED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_REFUND_DUE_DATE_PASSED,
  },
  PAYMENT_MERCHANT_UID_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_MERCHANT_UID_BAD_REQUEST,
  },
  PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: PAYMENT_ERROR.PAYMENT_IMMEDIATE_PAYMENT_FORBIDDEN,
  },
  PAYMENT_IMMEDIATE_PAYMENT_REQUIRED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_IMMEDIATE_PAYMENT_REQUIRED,
  },
  PAYMENT_NOT_APPROVED: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_NOT_APPROVED,
  },
  PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_ADDITIONAL_SERVICE_MAX_COUNT,
  },
  PAYMENT_MAX_RESERVATION_DATE: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_MAX_RESERVATION_DATE,
  },
  PAYMENT_REFUND_AMOUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: PAYMENT_ERROR.PAYMENT_REFUND_AMOUNT,
  },
};
