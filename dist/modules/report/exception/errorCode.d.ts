import type { ErrorCode } from 'cumuco-nestjs';
export declare const REPORT_ALREADY_EXISTS: "신고가 이미 존재합니다.";
export declare const REPORT_UPDATE_FORBIDDEN: "자신의 신고만 수정 가능합니다.";
export declare const REPORT_ANSWER_NOT_FOUND: "신고 답변을 찾을 수 없습니다.";
export declare const REPORT_ANSWER_MUTATION_FORBIDDEN: "자신의 신고 답변만 수정/삭제 가능합니다.";
export declare const REPORT_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'>;
