import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const PAYMENT_TOTAL_COST_BAD_REQUEST = '결제 비용을 다시 확인해주세요.' as const;
export const PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR = '대여하려는 상품에 문제가 있습니다.' as const;
export const PAYMENT_DATE_BAD_REQUEST = '대여 날짜를 다시 확인해주세요.' as const;
export const PAYMENT_CONFLICT = '예약이 불가합니다.' as const;

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
