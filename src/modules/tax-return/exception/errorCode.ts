import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const TAX_RETURN_NOT_FOUND = '세금계산서 신고 내역을 찾을 수 없습니다.' as const;

export const TAX_RETURN_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST'> = {
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
