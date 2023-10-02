import { ErrorCode, HTTP_STATUS } from 'cumuco-nestjs';

export const FAQ_ERROR = {
  FAQ_NOT_FOUND: 'FAQ를 찾을 수 없습니다.',
  FAQ_MUTATION_FORBIDDEN: '본인의 FAQ만 수정/삭제할 수 없습니다.',
} as const;

export const FAQ_ERROR_CODE: ErrorCode<typeof FAQ_ERROR> = {
  FAQ_NOT_FOUND: {
    code: HTTP_STATUS.NOT_FOUND,
    message: FAQ_ERROR.FAQ_NOT_FOUND,
  },
  FAQ_MUTATION_FORBIDDEN: {
    code: HTTP_STATUS.FORBIDDEN,
    message: FAQ_ERROR.FAQ_MUTATION_FORBIDDEN,
  },
};
