import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const HOME_IMAGE_NOT_FOUND = '홈 화면 이미지를 찾을 수 없습니다.' as const;
export const SLOGAN_NOT_FOUND = '슬로건을 찾을 수 없습니다.' as const;
export const HOME_IMAGE_NO_DEFAULT = '기본 설정된 홈 이미지가 없습니다.' as const;
export const SLOGAN_NO_DEFAULT = '기본 설정된 슬로건이 없습니다.' as const;

export const HOME_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
};
