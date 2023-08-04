import { ErrorCode } from 'cumuco-nestjs';
export declare const ALARM_NOT_FOUND: "알람을 찾을 수 없습니다.";
export declare const ALARM_MUTATION_FORBIDDEN: "알람을 수정할 권한이 없습니다.";
export declare const ALARM_PUSH_TOKEN_NOT_FOUND: "푸시 토큰을 찾을 수 없습니다.";
export declare const ALARM_ERROR_CODE: ErrorCode<'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'CONFLICT' | 'FORBIDDEN' | 'NOT_FOUND'>;
