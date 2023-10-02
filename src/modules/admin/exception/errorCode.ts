import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ADMIN_ERROR = {
  ADMIN_NOT_FOUND: '관리자를 찾을 수 없습니다.',
  ADMIN_SETTLEMENT_ALREADY_EXISTS: '정산 내역이 이미 존재합니다.',
  ADMIN_USER_COUPON_ALREADY_EXISTS: '유저 쿠폰이 이미 존재합니다.',
  ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST: '유저 쿠폰 만료일이 잘못되었습니다.',
  ADMIN_ICON_NOT_FOUND: '아이콘을 찾을 수 없습니다.',
  ADMIN_ICON_IN_USE: '아이콘이 사용중입니다.',
};

export const ADMIN_ERROR_CODE: ErrorCode<typeof ADMIN_ERROR> = {
  ADMIN_ICON_IN_USE: {
    code: HttpStatus.CONFLICT,
    message: ADMIN_ERROR.ADMIN_ICON_IN_USE,
  },
  ADMIN_ICON_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ADMIN_ERROR.ADMIN_ICON_NOT_FOUND,
  },
  ADMIN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ADMIN_ERROR.ADMIN_NOT_FOUND,
  },
  ADMIN_SETTLEMENT_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: ADMIN_ERROR.ADMIN_SETTLEMENT_ALREADY_EXISTS,
  },
  ADMIN_USER_COUPON_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: ADMIN_ERROR.ADMIN_USER_COUPON_ALREADY_EXISTS,
  },
  ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: ADMIN_ERROR.ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST,
  },
};
