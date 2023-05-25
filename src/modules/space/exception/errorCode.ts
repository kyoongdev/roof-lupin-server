import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SPACE_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: '공간을 찾을 수 없습니다.',
  },
};
