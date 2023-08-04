import type { ErrorCode } from 'cumuco-nestjs';
export declare const ALREADY_INTERESTED: "이미 찜을 했습니다..";
export declare const NOT_INTERESTED: "찜을 하지 않았습니다.";
export declare const RENTAL_TYPE_NOT_FOUND: "대여 타입을 찾을 수 없습니다.";
export declare const RENTAL_TYPE_ERROR: "렌탈 타입에 문제가 있습니다.";
export declare const CURRENT_LOCATION_BAD_REQUEST: "현재 위치 입력이 필수 입니다.";
export declare const REFUND_POLICY_LENGTH: "환불 정책은 9개이어야 합니다.";
export declare const REFUND_POLICY_DAYS_BEFORE_TYPE: "환불 정책의 n일 전 기한 입력이 잘못되었습니다.";
export declare const SPACE_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST'>;
