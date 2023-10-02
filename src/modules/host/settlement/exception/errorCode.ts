import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const SETTLEMENT_ERROR = {
  SETTLEMENT_NOT_FOUND: '정산을 찾을 수 없습니다.',
  SETTLEMENT_HOST_NOT_FOUND: '정산을 생성할 수 없습니다. 호스트를 찾을 수 없습니다.',
} as const;

export const SETTLEMENT_ERROR_CODE: ErrorCode<typeof SETTLEMENT_ERROR> = {
  SETTLEMENT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SETTLEMENT_ERROR.SETTLEMENT_NOT_FOUND,
  },
  SETTLEMENT_HOST_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SETTLEMENT_ERROR.SETTLEMENT_HOST_NOT_FOUND,
  },
};
