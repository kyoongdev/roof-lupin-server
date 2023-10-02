import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const SERVICE_ERROR = {
  SERVICE_NOT_FOUND: '서비스를 찾을 수 없습니다.',
  SERVICE_TITLE_NOT_FOUND: '서비스 제목을 찾을 수 없습니다.',
  SERVICE_ICON_CONDITION: '서비스 아이콘은 선택, 미선택 하나씩만 가능합니다.',
};

export const SERVICE_ERROR_CODE: ErrorCode<typeof SERVICE_ERROR> = {
  SERVICE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SERVICE_ERROR.SERVICE_NOT_FOUND,
  },
  SERVICE_TITLE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SERVICE_ERROR.SERVICE_TITLE_NOT_FOUND,
  },
  SERVICE_ICON_CONDITION: {
    code: HttpStatus.BAD_REQUEST,
    message: SERVICE_ERROR.SERVICE_ICON_CONDITION,
  },
};
