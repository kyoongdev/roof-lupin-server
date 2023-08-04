import { ErrorCode } from 'cumuco-nestjs';
export declare const SEARCH_RECORD_NOT_FOUND: "최근 검색어를 찾을 수 없습니다.";
export declare const SEARCH_RECORD_FORBIDDEN: "최근 검색어를 삭제할 수 없습니다.";
export declare const SEARCH_RECOMMEND_NOT_FOUND: "추천 검색어를 찾을 수 없습니다.";
export declare const SEARCH_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'>;
