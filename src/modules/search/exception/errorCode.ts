import { BaseErrorCode, ErrorCode, HTTP_STATUS } from 'cumuco-nestjs';

export const SEARCH_RECORD_NOT_FOUND = '최근 검색어를 찾을 수 없습니다.' as const;
export const SEARCH_RECORD_FORBIDDEN = '최근 검색어를 삭제할 수 없습니다.' as const;
export const SEARCH_RECOMMEND_NOT_FOUND = '추천 검색어를 찾을 수 없습니다.' as const;

export const SEARCH_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HTTP_STATUS.NOT_FOUND,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HTTP_STATUS.FORBIDDEN,
    message,
  }),
};
