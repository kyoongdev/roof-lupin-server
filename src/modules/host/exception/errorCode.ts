import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const HOST_ERROR = {
  HOST_NOT_FOUND: '호스트를 찾을 수 없습니다.',
  HOST_ALREADY_EXIST: '이미 존재하는 호스트입니다.',
  HOST_ACCOUNT_NOT_FOUND: '호스트 계좌 정보를 찾을 수 없습니다.',
  HOST_ACCOUNT_ALREADY_EXIST: '호스트 계좌 정보가 이미 존재합니다.',
  HOST_SPACE_FIND_FORBIDDEN: '본인이 등록한 공간만 조회가 가능합니다.',
  HOST_SPACE_MUTATION_FORBIDDEN: '본인이 등록한 공간만 수정/삭제가 가능합니다.',
  HOST_PHONE_NUMBER_BAD_REQUEST: '핸드폰 번호를 확인해주세요.',
  HOST_SPACE_RENTAL_TYPE_BAD_REQUEST: '공간 대여 타입을 확인해주세요. (시간 타입은 하나만 입력할 수 있습니다.)',
  HOST_TAX_RETURN_FIND_FORBIDDEN: '본인의 세금신고만 조회가 가능합니다.',
  HOST_SPACE_HOLIDAY_NOT_FOUND: '공간 휴무일을 찾을 수 없습니다.',
} as const;

export const HOST_ERROR_CODE: ErrorCode<typeof HOST_ERROR> = {
  HOST_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: HOST_ERROR.HOST_NOT_FOUND,
  },
  HOST_ALREADY_EXIST: {
    code: HttpStatus.CONFLICT,
    message: HOST_ERROR.HOST_ALREADY_EXIST,
  },
  HOST_ACCOUNT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: HOST_ERROR.HOST_ACCOUNT_NOT_FOUND,
  },
  HOST_ACCOUNT_ALREADY_EXIST: {
    code: HttpStatus.CONFLICT,
    message: HOST_ERROR.HOST_ACCOUNT_ALREADY_EXIST,
  },

  HOST_SPACE_FIND_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: HOST_ERROR.HOST_SPACE_FIND_FORBIDDEN,
  },
  HOST_SPACE_MUTATION_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: HOST_ERROR.HOST_SPACE_MUTATION_FORBIDDEN,
  },
  HOST_PHONE_NUMBER_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: HOST_ERROR.HOST_PHONE_NUMBER_BAD_REQUEST,
  },
  HOST_SPACE_RENTAL_TYPE_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: HOST_ERROR.HOST_SPACE_RENTAL_TYPE_BAD_REQUEST,
  },
  HOST_TAX_RETURN_FIND_FORBIDDEN: {
    code: HttpStatus.FORBIDDEN,
    message: HOST_ERROR.HOST_TAX_RETURN_FIND_FORBIDDEN,
  },
  HOST_SPACE_HOLIDAY_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: HOST_ERROR.HOST_SPACE_HOLIDAY_NOT_FOUND,
  },
};
