import { BaseErrorCode, ErrorCode, HTTP_STATUS } from 'wemacu-nestjs';

export const APP_INFO_NOT_FOUND = '앱 정보를 찾을 수 없습니다.' as const;

export const APP_INFO_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
};
