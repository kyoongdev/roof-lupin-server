import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const COUPON_ERROR = {
  COUPON_NOT_FOUND: '쿠폰을 찾을 수 없습니다.',
  USER_COUPON_NOT_FOUND: '유저 쿠폰을 찾을 수 없습니다.',
} as const;

export const COUPON_ERROR_CODE: ErrorCode<typeof COUPON_ERROR> = {
  COUPON_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: COUPON_ERROR.COUPON_NOT_FOUND,
  },
  USER_COUPON_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: COUPON_ERROR.USER_COUPON_NOT_FOUND,
  },
};
