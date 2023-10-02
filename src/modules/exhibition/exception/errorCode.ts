import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const EXHIBITION_ERROR = {
  EXHIBITION_NOT_FOUND: '기획전을 찾을 수 없습니다.',
  EXHIBITION_SPACE_NOT_FOUND: '기획전에 해당하는 공간을 찾을 수 없습니다.',
} as const;

export const EXHIBITION_ERROR_CODE: ErrorCode<typeof EXHIBITION_ERROR> = {
  EXHIBITION_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: EXHIBITION_ERROR.EXHIBITION_NOT_FOUND,
  },
  EXHIBITION_SPACE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: EXHIBITION_ERROR.EXHIBITION_SPACE_NOT_FOUND,
  },
};
