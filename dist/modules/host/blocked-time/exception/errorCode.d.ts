import { ErrorCode } from 'cumuco-nestjs';
export declare const BLOCKED_TIME_NOT_FOUND: "차단 시간을 찾을 수 없습니다.";
export declare const BLOCKED_TIME_RESERVATION_EXISTS: "해당 시간에 이미 예약이 있어 차단할 수 없습니다.";
export declare const BLOCKED_TIME_MUTATION_FORBIDDEN: "차단 시간을 생성/수정할 권한이 없습니다.";
export declare const BLOCKED_TIME_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'>;
