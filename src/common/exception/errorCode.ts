import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ENCRYPT_ERROR = '암호화 중 오류가 발생했습니다.' as const;

export const COMMON_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'INTERNAL_SERVER_ERROR'> = {
  NOT_FOUND: (message = '관리자를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
};
