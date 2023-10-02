import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const QNA_ERROR = {
  QNA_MUTATION_FORBIDDEN: '본인의 QnA만 수정/삭제가 가능합니다.',
  QNA_READ_FORBIDDEN: '본인의 QnA만 조회가 가능합니다.',
  QNA_NOT_FOUND: 'QnA를 찾을 수 없습니다.',
};

export const QNA_ERROR_CODE: ErrorCode<typeof QNA_ERROR> = {
  QNA_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: QNA_ERROR.QNA_MUTATION_FORBIDDEN,
  },
  QNA_READ_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: QNA_ERROR.QNA_READ_FORBIDDEN,
  },
  QNA_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: QNA_ERROR.QNA_NOT_FOUND,
  },
};
