import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const RANKING_NOT_FOUND = '랭킹을 찾을 수 없습니다.' as const;

export const RANKING_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
};
