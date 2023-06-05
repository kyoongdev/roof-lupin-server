import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const CURATION_NOT_FOUND = '큐레이션을 찾을 수 없습니다.' as const;

export const CURATION_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
};
