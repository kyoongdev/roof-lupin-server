import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ALARM_NOT_FOUND = '알람을 찾을 수 없습니다.' as const;
export const ALARM_MUTATION_FORBIDDEN = '알람을 수정할 권한이 없습니다.' as const;
export const ALARM_PUSH_TOKEN_NOT_FOUND = '푸시 토큰을 찾을 수 없습니다.' as const;

export const ALARM_ERROR_CODE: ErrorCode<
  'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'CONFLICT' | 'FORBIDDEN' | 'NOT_FOUND'
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
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
  NOT_FOUND: (message = 'Not Found') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
