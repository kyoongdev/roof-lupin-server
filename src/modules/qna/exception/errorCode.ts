import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const QNA_ERROR = {
  QNA_MUTATION_FORBIDDEN: '본인의 QnA만 수정/삭제가 가능합니다.',
  QNA_READ_FORBIDDEN: '본인의 QnA만 조회가 가능합니다.',
  QNA_NOT_FOUND: 'QnA를 찾을 수 없습니다.',
  QNA_UPDATE_DUE_DATE: 'QnA는 작성 후 2일 이내에만 수정이 가능합니다.',
  QNA_ANSWER_UPDATE_DUE_DATE: 'QnA 답변은 작성 후 72시간 이내에만 수정이 가능합니다.',
  QNA_ANSWER_MUTATION_FORBIDDEN: '본인이 작성한 QnA 댓글만 수정/삭제가 가능합니다.',
};

export const QNA_ERROR_CODE: ErrorCode<typeof QNA_ERROR> = {
  QNA_ANSWER_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: QNA_ERROR.QNA_ANSWER_MUTATION_FORBIDDEN,
  },
  QNA_ANSWER_UPDATE_DUE_DATE: {
    code: HttpStatus.FORBIDDEN,
    message: QNA_ERROR.QNA_ANSWER_UPDATE_DUE_DATE,
  },
  QNA_UPDATE_DUE_DATE: {
    code: HttpStatus.FORBIDDEN,
    message: QNA_ERROR.QNA_UPDATE_DUE_DATE,
  },
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
