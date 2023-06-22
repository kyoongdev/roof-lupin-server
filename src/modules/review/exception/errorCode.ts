import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SCORE_BAD_REQUEST = '점수는 1점에서 5점만 입력 가능합니다.' as const;
export const REVIEW_MUTATION_FORBIDDEN = '본인의 리뷰만 수정/삭제 가능합니다.' as const;
export const BEST_PHOTO_NOT_FOUND = '베스트 포토를 찾을 수 없습니다.' as const;
export const REVIEW_REPORT_NOT_FOUND = '리뷰 신고를 찾을 수 없습니다.' as const;
export const REVIEW_REPORT_ALREADY_EXISTS = '이미 신고한 리뷰입니다.' as const;
export const REVIEW_REPORT_MUTATION_FORBIDDEN = '본인의 신고만 수정/삭제 가능합니다.' as const;
export const REVIEW_IMAGE_LENGTH_EXCEEDED = '이미지는 최대 3개까지만 등록 가능합니다.' as const;
export const REVIEW_WRITE_DUE_DATE = '리뷰 작성 및 수정은 이용 후 14일까지만 가능합니다.' as const;
export const REVIEW_SPACE_BAD_REQUEST = '리뷰를 작성할 공간이 잘못되었습니다.' as const;

export const REVIEW_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'BAD_REQUEST' | 'FORBIDDEN' | 'CONFLICT'> = {
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
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
};
