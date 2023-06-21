import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const BLOCKED_TIME_NOT_FOUND = '차단 시간을 찾을 수 없습니다.' as const;

export const BLOCKED_TIME_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'> = {
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
};
