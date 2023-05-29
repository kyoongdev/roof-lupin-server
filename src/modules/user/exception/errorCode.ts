import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SOCIAL_USER_NOT_FOUND = '해당 소셜 ID에 해당하는 유저가 없습니다.' as const;
export const USER_ALREADY_EXIST = '이미 존재하는 유저입니다.' as const;

export const USER_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT'> = {
  NOT_FOUND: (message = '유저를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
};
