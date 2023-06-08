import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const RESERVATION_NOT_FOUND = '호스트를 찾을 수 없습니다.' as const;
export const RESERVATION_USER_FIND_FORBIDDEN = '본인의 예약 내역만 조회할 수 있습니다.' as const;
export const RESERVATION_USER_DELETE_FORBIDDEN = '본인의 예약 내역만 삭제할 수 있습니다.' as const;
export const RESERVATION_HOST_FIND_FORBIDDEN = '본인의 공간에 대한 예약 내역만 조회할 수 있습니다.' as const;
export const RESERVATION_TIME_BAD_REQUEST = '예약 시간을 다시 확인해주세요.' as const;
export const RESERVATION_COST_BAD_REQUEST = '예약 비용을 다시 확인해주세요.' as const;

export const RESERVATION_ERROR_CODE: ErrorCode<
  'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR'
> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
};
