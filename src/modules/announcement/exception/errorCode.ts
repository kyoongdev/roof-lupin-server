import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ANNOUNCEMENT_NOT_FOUND = '공지사항을 찾을 수 없습니다.' as const;

export const ANNOUNCEMENT_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = ANNOUNCEMENT_NOT_FOUND) => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
