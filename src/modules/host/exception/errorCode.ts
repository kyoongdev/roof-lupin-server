import { HttpCode, HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'wemacu-nestjs';

export const HOST_NOT_FOUND = '호스트를 찾을 수 없습니다.' as const;
export const HOST_ACCOUNT_NOT_FOUND = '호스트 계좌 정보를 찾을 수 없습니다.' as const;
export const HOST_ACCOUNT_ALREADY_EXIST = '호스트 계좌 정보가 이미 존재합니다.' as const;
export const QNA_ANSWER_MUTATION_FORBIDDEN = '본인이 작성한 QnA 댓글만 수정/삭제가 가능합니다.';
export const HOST_SPACE_FIND_FORBIDDEN = '본인이 등록한 공간만 조회가 가능합니다.' as const;
export const HOST_SPACE_MUTATION_FORBIDDEN = '본인이 등록한 공간만 수정/삭제가 가능합니다.' as const;
export const HOST_PHONE_NUMBER_BAD_REQUEST = '핸드폰 번호를 확인해주세요.' as const;
export const HOST_SPACE_RENTAL_TYPE_BAD_REQUEST =
  '공간 대여 타입을 확인해주세요. (시간 타입은 하나만 입력할 수 있습니다.)' as const;

export const HOST_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'BAD_REQUEST'> = {
  NOT_FOUND: (message = '호스트를 찾을 수 없습니다.') => ({
    code: HttpStatus.NOT_FOUND,
    message,
  }),
  CONFLICT: (message = 'CONFLICT') => ({
    code: HttpStatus.CONFLICT,
    message,
  }),
  FORBIDDEN: (message = 'FORBIDDEN') => ({
    code: HttpStatus.FORBIDDEN,
    message,
  }),
  BAD_REQUEST: (message = 'BAD_REQUEST') => ({
    code: HttpStatus.BAD_REQUEST,
    message,
  }),
};
