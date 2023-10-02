import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const BLOCKED_TIME_ERROR = {
  BLOCKED_TIME_NOT_FOUND: '차단 시간을 찾을 수 없습니다.',
  BLOCKED_TIME_RESERVATION_EXISTS: '해당 시간에 이미 예약이 있어 차단할 수 없습니다.',
  BLOCKED_TIME_MUTATION_FORBIDDEN: '차단 시간을 생성/수정할 권한이 없습니다.',
  BLOCKED_TIME_PERIOD: '시작시간이 끝나는 시간보다 작을 수 없습니다.',
} as const;

export const BLOCKED_TIME_ERROR_CODE: ErrorCode<typeof BLOCKED_TIME_ERROR> = {
  BLOCKED_TIME_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: BLOCKED_TIME_ERROR.BLOCKED_TIME_NOT_FOUND,
  },
  BLOCKED_TIME_RESERVATION_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: BLOCKED_TIME_ERROR.BLOCKED_TIME_RESERVATION_EXISTS,
  },
  BLOCKED_TIME_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: BLOCKED_TIME_ERROR.BLOCKED_TIME_MUTATION_FORBIDDEN,
  },
  BLOCKED_TIME_PERIOD: {
    code: HttpStatus.BAD_REQUEST,
    message: BLOCKED_TIME_ERROR.BLOCKED_TIME_PERIOD,
  },
};
