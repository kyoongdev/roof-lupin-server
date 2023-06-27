import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const PAYMENT_TOTAL_COST_BAD_REQUEST = '결제 비용을 다시 확인해주세요.' as const;
export const PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR = '대여하려는 상품에 문제가 있습니다.' as const;
export const PAYMENT_INTERNAL_SERVER_ERROR = '결제에 문제가 생겼습니다.' as const;
export const PAYMENT_DATE_BAD_REQUEST = '대여 날짜를 다시 확인해주세요.' as const;
export const PAYMENT_CONFLICT = '예약이 불가합니다.' as const;
export const PAYMENT_ORDER_RESULT_ID_BAD_REQUEST = '주문결과를 다시 확인해주세요.' as const;
export const PAYMENT_PAY_METHOD_BAD_REQUEST = '결제 수단(pg, toss, kakao)을 다시 확인해주세요.' as const;
export const PAYMENT_COUPON_DUE_DATE_EXPIRED = '쿠폰 사용 일자가 지났습니다.' as const;
export const PAYMENT_COUPON_IS_USED = '이미 쿠폰을 사용했습니다.' as const;
export const PAYMENT_COUPON_COUNT_ZERO = '사용 가능한 쿠폰이 없습니다.' as const;

export const PAYMENT_ERROR_CODE: ErrorCode<'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'CONFLICT'> = {
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
};
