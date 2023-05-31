import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SCORE_BAD_REQUEST = '점수는 1점에서 5점만 입력 가능합니다.' as const;
export const REVIEW_MUTATION_FORBIDDEN = '본인의 리뷰만 수정/삭제 가능합니다.' as const;

export const REVIEW_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'BAD_REQUEST' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = '리뷰를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
};
