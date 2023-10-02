import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const LOCATION_ERROR = {
  LOCATION_FILTER_GROUP_NOT_FOUND: '위치 필터 그룹을 찾을 수 없습니다.',
  LOCATION_FILTER_NOT_FOUND: '위치 필터를 찾을 수 없습니다.',
} as const;

export const LOCATION_ERROR_CODE: ErrorCode<typeof LOCATION_ERROR> = {
  LOCATION_FILTER_GROUP_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: LOCATION_ERROR.LOCATION_FILTER_GROUP_NOT_FOUND,
  },
  LOCATION_FILTER_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: LOCATION_ERROR.LOCATION_FILTER_NOT_FOUND,
  },
};
