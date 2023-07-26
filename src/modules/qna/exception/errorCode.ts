import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const QNA_MUTATION_FORBIDDEN = '본인의 QnA만 수정/삭제가 가능합니다.' as const;

export const QNA_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = '신고를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
};
