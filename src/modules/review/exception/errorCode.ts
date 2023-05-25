import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const REVIEW_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = '리뷰를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
