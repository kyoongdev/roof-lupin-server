import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const ALREADY_INTERESTED = '이미 찜을 했습니다..' as const;
export const NOT_INTERESTED = '찜을 하지 않았습니다.' as const;
export const RENTAL_TYPE_NOT_FOUND = '대여 타입을 찾을 수 없습니다.' as const;
export const RENTAL_TYPE_ERROR = '렌탈 타입에 문제가 있습니다.' as const;
export const CURRENT_LOCATION_BAD_REQUEST = '현재 위치 입력이 필수 입니다.' as const;
export const REFUND_POLICY_LENGTH = '환불 정책은 9개이어야 합니다.' as const;
export const REFUND_POLICY_DAYS_BEFORE_TYPE = '환불 정책의 n일 전 기한 입력이 잘못되었습니다.' as const;

export const SPACE_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = '공간을 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
