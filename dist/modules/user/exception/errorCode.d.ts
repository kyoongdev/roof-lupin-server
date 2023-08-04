import type { ErrorCode } from 'cumuco-nestjs';
export declare const SOCIAL_USER_NOT_FOUND: "해당 소셜 ID에 해당하는 유저가 없습니다.";
export declare const USER_ALREADY_EXIST: "이미 존재하는 유저입니다.";
export declare const HARD_DELETE_FAILED: "유저를 삭제하는데 실패했습니다.(아직 탈퇴하지 않은 회원입니다.)";
export declare const USER_ALREADY_BLOCKED: "이미 차단된 유저입니다.";
export declare const USER_BLOCKED: "차단된 유저입니다.";
export declare const USER_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'>;
