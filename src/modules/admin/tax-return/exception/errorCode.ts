import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const TAX_RETURN_ERROR = {
  TAX_RETURN_NOT_FOUND: '세금계산서 신고 내역을 찾을 수 없습니다.',
} as const;

export const TAX_RETURN_ERROR_CODE: ErrorCode<typeof TAX_RETURN_ERROR> = {
  TAX_RETURN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: TAX_RETURN_ERROR.TAX_RETURN_NOT_FOUND,
  },
};
