import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const SERVICE_NOT_FOUND = '서비스를 찾을 수 없습니다.' as const;
export const SERVICE_TITLE_NOT_FOUND = '서비스 제목을 찾을 수 없습니다.' as const;
export const SERVICE_ICON_CONDITION = '서비스 아이콘은 선택, 미선택 하나씩만 가능합니다.' as const;

export const SERVICE_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = 'NOT_FOUND') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
