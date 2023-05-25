import { HttpStatus } from '@nestjs/common';
import type { ErrorCode } from 'wemacu-nestjs';

export const QNA_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: '신고를 찾을 수 없습니다.',
  },
};
