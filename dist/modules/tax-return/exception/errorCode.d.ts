import type { ErrorCode } from 'cumuco-nestjs';
export declare const TAX_RETURN_NOT_FOUND: "세금계산서 신고 내역을 찾을 수 없습니다.";
export declare const TAX_RETURN_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST'>;
