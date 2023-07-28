import { ErrorCode, HTTP_STATUS } from 'cumuco-nestjs';

export const FAQ_NOT_FOUND = 'FAQ를 찾을 수 없습니다.' as const;
export const FAQ_MUTATION_FORBIDDEN = '본인의 FAQ만 수정/삭제할 수 없습니다.' as const;

export const FAQ_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HTTP_STATUS.FORBIDDEN,
    message,
  }),
};
