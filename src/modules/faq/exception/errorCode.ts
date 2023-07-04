import { ErrorCode, HTTP_STATUS } from 'wemacu-nestjs';

export const FAQ_NOT_FOUND = 'FAQ를 찾을 수 없습니다.' as const;

export const FAQ_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
};
