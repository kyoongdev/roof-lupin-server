import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const ALARM_NOT_FOUND = '알람을 찾을 수 없습니다.' as const;

export const ALARM_ERROR_CODE: ErrorCode<
  'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'CONFLICT' | 'UNAUTHORIZED' | 'NOT_FOUND'
> = {
  BAD_REQUEST: (message = 'Bad Request') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'Internal Server Error') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
  CONFLICT: (message = 'Conflict') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  UNAUTHORIZED: (message = 'Unauthorized') => ({
    code: HttpStatus.UNAUTHORIZED,
    message,
  }),
  NOT_FOUND: (message = 'Not Found') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
