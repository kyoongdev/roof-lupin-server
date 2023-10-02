import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const FREQUENT_QUESTION_ERROR = {
  FREQUENT_QUESTION_NOT_FOUND: '자주 묻는 질문을 찾을 수 없습니다.',
} as const;

export const FREQUENT_QUESTION_ERROR_CODE: ErrorCode<typeof FREQUENT_QUESTION_ERROR> = {
  FREQUENT_QUESTION_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: FREQUENT_QUESTION_ERROR.FREQUENT_QUESTION_NOT_FOUND,
  },
};
