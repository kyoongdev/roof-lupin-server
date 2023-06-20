import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const PAYMENT_TOTAL_COST_BAD_REQUEST = '결제 비용을 다시 확인해주세요.' as const;

export const PAYMENT_ERROR_CODE: ErrorCode<'BAD_REQUEST'> = {
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
