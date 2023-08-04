import { ErrorCode } from 'cumuco-nestjs';
export declare const WRONG_ACCESS_TOKEN: "잘못된 액세스 토큰입니다.";
export declare const WRONG_REFRESH_TOKEN: "잘못된 리프레쉬 토큰입니다.";
export declare const WRONG_KEY: "토큰 key 값이 일치하지 않습니다.";
export declare const WRONG_ID: "토큰 id 값이 일치하지 않습니다.";
export declare const CALLBACK_ERROR: "소셜 로그인 중 문제가 발생했습니다.";
export declare const SOCIAL_USER_ERROR: "코드 혹은 토큰이 잘못되었습니다.";
export declare const ALREADY_EXIST_USER: "이미 존재하는 유저입니다.";
export declare const ALREADY_EXIST_ADMIN: "이미 존재하는 관리자입니다.";
export declare const ALREADY_EXIST_HOST: "이미 존재하는 호스트입니다.";
export declare const WRONG_PASSWORD: "비밀번호가 일치하지 않습니다.";
export declare const NOT_ACCEPTED_ADMIN: "승인되지 않은 관리자입니다.";
export declare const AUTH_ERROR_CODE: ErrorCode<'BAD_REQUEST' | 'INTERNAL_SERVER_ERROR' | 'CONFLICT' | 'UNAUTHORIZED'>;
