import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const SERVICE_NOT_FOUND = '서비스를 찾을 수 없습니다.' as const;
export const SERVICE_TITLE_NOT_FOUND = '서비스 제목을 찾을 수 없습니다.' as const;

export const SERVICE_ERROR_CODE: ErrorCode<'NOT_FOUND'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
};
