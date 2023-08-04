import type { ErrorCode } from 'cumuco-nestjs';
export declare const TERM_ALREADY_EXISTS: "이미 약관이 존재합니다.";
export declare const TERM_NOT_FOUND: "약관을 찾을 수 없습니다.";
export declare const TERM_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST'>;
