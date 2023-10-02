import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const HOME_ERROR = {
  HOME_CONTENTS_NOT_FOUND: '홈 화면 컨텐츠를 찾을 수 없습니다.',
  HOME_AT_LEAST_ONE_TARGET: '하나의 대상이 필요합니다.',
  HOME_CONTENT_DELETED: '컨텐츠가 삭제되었습니다.',
} as const;

export const HOME_ERROR_CODE: ErrorCode<typeof HOME_ERROR> = {
  HOME_CONTENTS_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: HOME_ERROR.HOME_CONTENTS_NOT_FOUND,
  },
  HOME_AT_LEAST_ONE_TARGET: {
    code: HttpStatus.BAD_REQUEST,
    message: HOME_ERROR.HOME_AT_LEAST_ONE_TARGET,
  },
  HOME_CONTENT_DELETED: {
    code: HttpStatus.BAD_REQUEST,
    message: HOME_ERROR.HOME_CONTENT_DELETED,
  },
};
