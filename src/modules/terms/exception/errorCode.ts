import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const TERM_ERROR = {
  TERM_ALREADY_EXISTS: '이미 약관이 존재합니다.',
  TERM_NOT_FOUND: '약관을 찾을 수 없습니다.',
};

export const TERM_ERROR_CODE: ErrorCode<typeof TERM_ERROR> = {
  TERM_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: TERM_ERROR.TERM_ALREADY_EXISTS,
  },
  TERM_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: TERM_ERROR.TERM_NOT_FOUND,
  },
};
