import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const ADMIN_NOT_FOUND = '관리자를 찾을 수 없습니다.' as const;

export const ADMIN_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = '관리자를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
