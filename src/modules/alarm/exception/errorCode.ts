import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const ALARM_ERROR = {
  ALARM_NOT_FOUND: '알람을 찾을 수 없습니다.',
  ALARM_MUTATION_FORBIDDEN: '알람을 수정할 권한이 없습니다.',
  ALARM_PUSH_TOKEN_NOT_FOUND: '푸시 토큰을 찾을 수 없습니다.',
};

export const ALARM_ERROR_CODE: ErrorCode<typeof ALARM_ERROR> = {
  ALARM_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ALARM_ERROR.ALARM_NOT_FOUND,
  },
  ALARM_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: ALARM_ERROR.ALARM_MUTATION_FORBIDDEN,
  },
  ALARM_PUSH_TOKEN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ALARM_ERROR.ALARM_PUSH_TOKEN_NOT_FOUND,
  },
};
