import { ErrorCode, HTTP_STATUS } from 'cumuco-nestjs';

export const FREQUENT_QUESTION_NOT_FOUND = '자주 묻는 질문을 찾을 수 없습니다.' as const;

export const FREQUENT_QUESTION_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
};
