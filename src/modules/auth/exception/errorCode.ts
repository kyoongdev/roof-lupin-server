import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const WRONG_ACCESS_TOKEN = '잘못된 액세스 토큰입니다.' as const;
export const WRONG_REFRESH_TOKEN = '잘못된 리프레쉬 토큰입니다.' as const;
export const WRONG_KEY = '토큰 key 값이 일치하지 않습니다.' as const;
export const WRONG_ID = '토큰 id 값이 일치하지 않습니다.' as const;

export const AUTH_ERROR_CODE: ErrorCode<'BAD_REQUEST'> = {
  BAD_REQUEST: (message = 'Bad Request') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
