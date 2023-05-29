import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SCORE_BAD_REQUEST = '점수는 1점에서 5점만 입력 가능합니다.' as const;

export const REVIEW_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = '리뷰를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
