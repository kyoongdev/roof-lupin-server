import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const CATEGORY_ERROR = {
  CATEGORY_NOT_FOUND: '카테고리를 찾을 수 없습니다.',
  HOME_CATEGORY_COUNT: '홈 카테고리는 5개까지만 등록할 수 있습니다.',
  HOME_CATEGORY_ICON_PATH_BAD_REQUEST: '홈 카테고리는 iconId가 필수입니다.',
  CONTENT_CATEGORY_NOT_FOUND: '콘텐츠 카테고리를 찾을 수 없습니다.',
  CONTENT_CATEGORY_SPACE_NOT_FOUND: '콘텐츠 카테고리의 공간을 찾을 수 없습니다.',
};

export const CATEGORY_ERROR_CODE: ErrorCode<typeof CATEGORY_ERROR> = {
  CATEGORY_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: CATEGORY_ERROR.CATEGORY_NOT_FOUND,
  },
  HOME_CATEGORY_COUNT: {
    code: HttpStatus.CONFLICT,
    message: CATEGORY_ERROR.HOME_CATEGORY_COUNT,
  },
  HOME_CATEGORY_ICON_PATH_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: CATEGORY_ERROR.HOME_CATEGORY_ICON_PATH_BAD_REQUEST,
  },
  CONTENT_CATEGORY_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: CATEGORY_ERROR.CONTENT_CATEGORY_NOT_FOUND,
  },
  CONTENT_CATEGORY_SPACE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: CATEGORY_ERROR.CONTENT_CATEGORY_SPACE_NOT_FOUND,
  },
};
