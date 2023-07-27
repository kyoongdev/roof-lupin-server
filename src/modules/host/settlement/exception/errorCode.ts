import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const SETTLEMENT_NOT_FOUND = '정산을 찾을 수 없습니다.' as const;
export const SETTLEMENT_HOST_NOT_FOUND = '정산을 생성할 수 없습니다. 호스트를 찾을 수 없습니다.' as const;

export const SETTLEMENT_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'BAD_REQUEST'> = {
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
};
