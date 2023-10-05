import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const AUTH_ERROR = {
  WRONG_ACCESS_TOKEN: '잘못된 액세스 토큰입니다.',
  WRONG_REFRESH_TOKEN: '잘못된 리프레쉬 토큰입니다.',
  WRONG_KEY: '토큰 key 값이 일치하지 않습니다.',
  WRONG_ID: '토큰 id 값이 일치하지 않습니다.',
  CALLBACK_ERROR: '소셜 로그인 중 문제가 발생했습니다.',
  SOCIAL_USER_ERROR: '코드 혹은 토큰이 잘못되었습니다.',
  ALREADY_EXIST_USER: '이미 존재하는 유저입니다.',
  ALREADY_EXIST_ADMIN: '이미 존재하는 관리자입니다.',
  ALREADY_EXIST_HOST: '이미 존재하는 호스트입니다.',
  WRONG_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NOT_ACCEPTED_ADMIN: '승인되지 않은 관리자입니다.',
  DEV_ONLY: '개발 환경에서만 사용이 가능합니다.',
} as const;

export const AUTH_ERROR_CODE: ErrorCode<typeof AUTH_ERROR> = {
  DEV_ONLY: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.DEV_ONLY,
  },
  WRONG_ACCESS_TOKEN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ACCESS_TOKEN,
  },
  WRONG_REFRESH_TOKEN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_REFRESH_TOKEN,
  },
  WRONG_KEY: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_KEY,
  },
  WRONG_ID: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ID,
  },
  CALLBACK_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: AUTH_ERROR.CALLBACK_ERROR,
  },
  SOCIAL_USER_ERROR: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.SOCIAL_USER_ERROR,
  },
  ALREADY_EXIST_USER: {
    code: HttpStatus.CONFLICT,
    message: AUTH_ERROR.ALREADY_EXIST_USER,
  },
  ALREADY_EXIST_ADMIN: {
    code: HttpStatus.CONFLICT,
    message: AUTH_ERROR.ALREADY_EXIST_ADMIN,
  },
  ALREADY_EXIST_HOST: {
    code: HttpStatus.CONFLICT,
    message: AUTH_ERROR.ALREADY_EXIST_HOST,
  },
  WRONG_PASSWORD: {
    code: HttpStatus.BAD_REQUEST,
    message: AUTH_ERROR.WRONG_PASSWORD,
  },
  NOT_ACCEPTED_ADMIN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.NOT_ACCEPTED_ADMIN,
  },
};
