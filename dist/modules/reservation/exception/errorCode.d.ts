import { ErrorCode } from 'cumuco-nestjs';
export declare const RESERVATION_NOT_FOUND: "예약을 찾을 수 없습니다.";
export declare const RESERVATION_USER_FIND_FORBIDDEN: "본인의 예약 내역만 조회할 수 있습니다.";
export declare const RESERVATION_USER_DELETE_FORBIDDEN: "본인의 예약 내역만 삭제할 수 있습니다.";
export declare const RESERVATION_HOST_FIND_FORBIDDEN: "본인의 공간에 대한 예약 내역만 조회할 수 있습니다.";
export declare const RESERVATION_TIME_BAD_REQUEST: "예약 시간을 다시 확인해주세요.";
export declare const RESERVATION_COST_BAD_REQUEST: "예약 비용을 다시 확인해주세요.";
export declare const RESERVATION_ALREADY_APPROVED: "이미 승인된 예약입니다.";
export declare const RESERVATION_SPACE_NOT_IMMEDIATE: "즉시 예약이 불가능한 공간입니다.";
export declare const RESERVATION_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR'>;
