import { HttpCode, HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const HOST_NOT_FOUND = '호스트를 찾을 수 없습니다.' as const;
export const HOST_ACCOUNT_NOT_FOUND = '호스트 계좌 정보를 찾을 수 없습니다.' as const;

export const HOST_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = '호스트를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
