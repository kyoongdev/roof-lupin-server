import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ANNOUNCEMENT_ERROR = {
  ANNOUNCEMENT_NOT_FOUND: '공지사항을 찾을 수 없습니다.',
};

export const ANNOUNCEMENT_ERROR_CODE: ErrorCode<typeof ANNOUNCEMENT_ERROR> = {
  ANNOUNCEMENT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ANNOUNCEMENT_ERROR.ANNOUNCEMENT_NOT_FOUND,
  },
};
