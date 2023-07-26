import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ADMIN_NOT_FOUND = '관리자를 찾을 수 없습니다.' as const;
export const ADMIN_SETTLEMENT_ALREADY_EXISTS = '정산 내역이 이미 존재합니다.' as const;
export const ADMIN_USER_COUPON_ALREADY_EXISTS = '유저 쿠폰이 이미 존재합니다.' as const;
export const ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST = '유저 쿠폰 만료일이 잘못되었습니다.' as const;

export const ADMIN_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = '관리자를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
