import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const COMMON_ERROR = {
  ENCRYPT_ERROR: '암호화 중 오류가 발생했습니다.',
} as const;

export const COMMON_ERROR_CODE: ErrorCode<typeof COMMON_ERROR> = {
  ENCRYPT_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: COMMON_ERROR.ENCRYPT_ERROR,
  },
};
