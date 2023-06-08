import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'wemacu-nestjs';

export const ALREADY_INTERESTED = '이미 찜을 했습니다..' as const;
export const NOT_INTERESTED = '찜을 하지 않았습니다.' as const;
export const RENTAL_TYPE_NOT_FOUND = '대여 타입을 찾을 수 없습니다.' as const;
export const RENTAL_TYPE_ERROR = '렌탈 타입에 문제가 있습니다.' as const;

export const SPACE_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR'> = {
  NOT_FOUND: (message = '공간을 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
  }),
};
