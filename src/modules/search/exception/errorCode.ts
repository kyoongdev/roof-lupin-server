import { BaseErrorCode, ErrorCode, HTTP_STATUS } from 'cumuco-nestjs';

export const SEARCH_ERROR = {
  SEARCH_RECORD_NOT_FOUND: '최근 검색어를 찾을 수 없습니다.',
  SEARCH_RECORD_FORBIDDEN: '최근 검색어를 삭제할 수 없습니다.',
  SEARCH_RECOMMEND_NOT_FOUND: '추천 검색어를 찾을 수 없습니다.',
} as const;

export const SEARCH_ERROR_CODE: ErrorCode<typeof SEARCH_ERROR> = {
  SEARCH_RECORD_NOT_FOUND: {
    code: HTTP_STATUS.NOT_FOUND,
    message: SEARCH_ERROR.SEARCH_RECORD_NOT_FOUND,
  },
  SEARCH_RECORD_FORBIDDEN: {
    code: HTTP_STATUS.FORBIDDEN,
    message: SEARCH_ERROR.SEARCH_RECORD_FORBIDDEN,
  },
  SEARCH_RECOMMEND_NOT_FOUND: {
    code: HTTP_STATUS.NOT_FOUND,
    message: SEARCH_ERROR.SEARCH_RECOMMEND_NOT_FOUND,
  },
};
