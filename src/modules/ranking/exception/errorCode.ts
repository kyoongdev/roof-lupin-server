import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const RANKING_ERROR = {
  RANKING_NOT_FOUND: '랭킹을 찾을 수 없습니다.',
  RANKING_SPACE_NOT_FOUND: '랭킹 장소를 찾을 수 없습니다.',
};

export const RANKING_ERROR_CODE: ErrorCode<typeof RANKING_ERROR> = {
  RANKING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: RANKING_ERROR.RANKING_NOT_FOUND,
  },
  RANKING_SPACE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: RANKING_ERROR.RANKING_SPACE_NOT_FOUND,
  },
};
