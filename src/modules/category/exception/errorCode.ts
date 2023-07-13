import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const CATEGORY_NOT_FOUND = '카테고리를 찾을 수 없습니다.' as const;
export const HOME_CATEGORY_COUNT = '홈 카테고리는 5개까지만 등록할 수 있습니다.' as const;
export const HOME_CATEGORY_ICON_PATH_BAD_REQUEST = '홈 카테고리는 iconPath가 필수입니다.' as const;
export const CONTENT_CATEGORY_NOT_FOUND = '콘텐츠 카테고리를 찾을 수 없습니다.' as const;

export const CATEGORY_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
