import { BaseErrorCode, ErrorCode, HTTP_STATUS } from 'wemacu-nestjs';

export const EXHIBITION_NOT_FOUND = '기획전을 찾을 수 없습니다.' as const;

export const EXHIBITION_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
};
