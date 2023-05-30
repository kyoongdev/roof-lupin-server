import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const SOCIAL_USER_NOT_FOUND = '해당 소셜 ID에 해당하는 유저가 없습니다.' as const;
export const USER_ALREADY_EXIST = '이미 존재하는 유저입니다.' as const;
export const HARD_DELETE_FAILED = '유저를 삭제하는데 실패했습니다.(아직 탈퇴하지 않은 회원입니다.)' as const;

export const USER_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'> = {
  NOT_FOUND: (message = '유저를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
};
