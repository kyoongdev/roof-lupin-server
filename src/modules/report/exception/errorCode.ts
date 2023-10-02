import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const REPORT_ERROR = {
  REPORT_ALREADY_EXISTS: '신고가 이미 존재합니다.',
  REPORT_ANSWER_ALREADY_EXISTS: '신고 답변이 이미 존재합니다.',
  REPORT_UPDATE_FORBIDDEN: '자신의 신고만 수정 가능합니다.',
  REPORT_ANSWER_NOT_FOUND: '신고 답변을 찾을 수 없습니다.',
  REPORT_ANSWER_MUTATION_FORBIDDEN: '자신의 신고 답변만 수정/삭제 가능합니다.',
  REPORT_NOT_FOUND: '신고를 찾을 수 없습니다.',
};

export const REPORT_ERROR_CODE: ErrorCode<typeof REPORT_ERROR> = {
  REPORT_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: REPORT_ERROR.REPORT_ALREADY_EXISTS,
  },
  REPORT_ANSWER_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: REPORT_ERROR.REPORT_ANSWER_ALREADY_EXISTS,
  },
  REPORT_UPDATE_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: REPORT_ERROR.REPORT_UPDATE_FORBIDDEN,
  },
  REPORT_ANSWER_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REPORT_ERROR.REPORT_ANSWER_NOT_FOUND,
  },
  REPORT_ANSWER_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: REPORT_ERROR.REPORT_ANSWER_MUTATION_FORBIDDEN,
  },
  REPORT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REPORT_ERROR.REPORT_NOT_FOUND,
  },
};
