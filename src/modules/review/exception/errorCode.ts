import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const REVIEW_ERROR = {
  REVIEW_NOT_FOUND: '리뷰를 찾을 수 없습니다.',
  SCORE_BAD_REQUEST: '점수는 1점에서 5점만 입력 가능합니다.',
  REVIEW_MUTATION_FORBIDDEN: '본인의 리뷰만 수정/삭제 가능합니다.',
  REVIEW_ANSWER_MUTATION_FORBIDDEN: '본인의 공간의 리뷰만 답변을 수정/삭제 가능합니다.',
  REVIEW_ANSWER_ALREADY_WRITTEN: '이미 답변을 작성한 이력이 있습니다.',
  REVIEW_ANSWER_NOT_FOUND: '리뷰 답변을 찾을 수 없습니다.',
  REVIEW_ANSWER_UPDATE_DUE_DATE: '리뷰 수정은 작성 후 72시간까지만 가능합니다.',
  REVIEW_ALREADY_EXISTS: '이미 리뷰를 작성하였습니다.',
  REVIEW_IMAGE_NOT_FOUND: '리뷰 이미지를 찾을 수 없습니다.',
  BEST_PHOTO_NOT_FOUND: '베스트 포토를 찾을 수 없습니다.',
  BEST_PHOTO_LENGTH_EXCEEDED: '베스트 포토는 최대 10개까지만 등록 가능합니다.',
  REVIEW_REPORT_NOT_FOUND: '리뷰 신고를 찾을 수 없습니다.',
  REVIEW_REPORT_ALREADY_EXISTS: '이미 신고한 리뷰입니다.',
  REVIEW_REPORT_MUTATION_FORBIDDEN: '본인의 신고만 수정/삭제 가능합니다.',
  REVIEW_IMAGE_LENGTH_EXCEEDED: '이미지는 최대 3개까지만 등록 가능합니다.',
  REVIEW_WRITE_DUE_DATE: '리뷰 작성은 이용 후 14일안에만 작성이 가능합니다.',
  REVIEW_UPDATE_DUE_DATE: '리뷰 수정은 작성 후 72시간까지만 가능합니다.',
  REVIEW_SPACE_BAD_REQUEST: '리뷰를 작성할 공간이 잘못되었습니다.',
};

export const REVIEW_ERROR_CODE: ErrorCode<typeof REVIEW_ERROR> = {
  REVIEW_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_NOT_FOUND,
  },
  SCORE_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: REVIEW_ERROR.SCORE_BAD_REQUEST,
  },
  REVIEW_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: REVIEW_ERROR.REVIEW_MUTATION_FORBIDDEN,
  },
  REVIEW_ANSWER_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: REVIEW_ERROR.REVIEW_ANSWER_MUTATION_FORBIDDEN,
  },
  REVIEW_ANSWER_ALREADY_WRITTEN: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.REVIEW_ANSWER_ALREADY_WRITTEN,
  },
  REVIEW_ANSWER_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_ANSWER_NOT_FOUND,
  },
  REVIEW_ANSWER_UPDATE_DUE_DATE: {
    code: HttpStatus.BAD_REQUEST,
    message: REVIEW_ERROR.REVIEW_ANSWER_UPDATE_DUE_DATE,
  },
  REVIEW_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.REVIEW_ALREADY_EXISTS,
  },
  REVIEW_IMAGE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_IMAGE_NOT_FOUND,
  },
  BEST_PHOTO_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.BEST_PHOTO_NOT_FOUND,
  },
  BEST_PHOTO_LENGTH_EXCEEDED: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.BEST_PHOTO_LENGTH_EXCEEDED,
  },
  REVIEW_REPORT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_REPORT_NOT_FOUND,
  },
  REVIEW_REPORT_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.REVIEW_REPORT_ALREADY_EXISTS,
  },
  REVIEW_REPORT_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: REVIEW_ERROR.REVIEW_REPORT_MUTATION_FORBIDDEN,
  },
  REVIEW_IMAGE_LENGTH_EXCEEDED: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.REVIEW_IMAGE_LENGTH_EXCEEDED,
  },
  REVIEW_WRITE_DUE_DATE: {
    code: HttpStatus.BAD_REQUEST,
    message: REVIEW_ERROR.REVIEW_WRITE_DUE_DATE,
  },
  REVIEW_UPDATE_DUE_DATE: {
    code: HttpStatus.BAD_REQUEST,
    message: REVIEW_ERROR.REVIEW_UPDATE_DUE_DATE,
  },
  REVIEW_SPACE_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: REVIEW_ERROR.REVIEW_SPACE_BAD_REQUEST,
  },
};
