import type { ErrorCode } from 'cumuco-nestjs';
export declare const SETTLEMENT_NOT_FOUND: "정산을 찾을 수 없습니다.";
export declare const SETTLEMENT_HOST_NOT_FOUND: "정산을 생성할 수 없습니다. 호스트를 찾을 수 없습니다.";
export declare const SETTLEMENT_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'BAD_REQUEST'>;
