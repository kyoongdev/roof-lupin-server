import { HttpCode, HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const HOST_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: '호스트를 찾을 수 없습니다.',
  },
};
