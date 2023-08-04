import { ErrorCode } from 'cumuco-nestjs';
export declare const COUPON_NOT_FOUND: "쿠폰을 찾을 수 없습니다.";
export declare const USER_COUPON_NOT_FOUND: "유저 쿠폰을 찾을 수 없습니다.";
export declare const COUPON_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'>;
