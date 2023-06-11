import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const CATEGORY_NOT_FOUND = '카테고리를 찾을 수 없습니다.' as const;

export const CATEGORY_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
