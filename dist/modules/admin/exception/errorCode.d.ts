import { ErrorCode } from 'cumuco-nestjs';
export declare const ADMIN_NOT_FOUND: "관리자를 찾을 수 없습니다.";
export declare const ADMIN_SETTLEMENT_ALREADY_EXISTS: "정산 내역이 이미 존재합니다.";
export declare const ADMIN_USER_COUPON_ALREADY_EXISTS: "유저 쿠폰이 이미 존재합니다.";
export declare const ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST: "유저 쿠폰 만료일이 잘못되었습니다.";
export declare const ADMIN_ICON_NOT_FOUND: "아이콘을 찾을 수 없습니다.";
export declare const ADMIN_ICON_IN_USE: "아이콘이 사용중입니다.";
export declare const ADMIN_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'BAD_REQUEST'>;
