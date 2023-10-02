import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from 'cumuco-nestjs';

export const SPACE_ERROR = {
  SPACE_NOT_FOUND: '공간을 찾을 수 없습니다.',
  ALREADY_INTERESTED: '이미 찜을 했습니다.',
  NOT_INTERESTED: '찜을 하지 않았습니다.',
  RENTAL_TYPE_NOT_FOUND: '대여 타입을 찾을 수 없습니다.',
  RENTAL_TYPE_ERROR: '렌탈 타입에 문제가 있습니다.',
  CURRENT_LOCATION_BAD_REQUEST: '현재 위치 입력이 필수 입니다.',
  REFUND_POLICY_LENGTH: '환불 정책은 9개이어야 합니다.',
  REFUND_POLICY_DAYS_BEFORE_TYPE: '환불 정책의 n일 전 기한 입력이 잘못되었습니다.',
  MAIN_SPACE_EXISTS: '메인 공간은 하나만 존재해야 합니다.',
};

export const SPACE_ERROR_CODE: ErrorCode<typeof SPACE_ERROR> = {
  SPACE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SPACE_ERROR.SPACE_NOT_FOUND,
  },
  ALREADY_INTERESTED: {
    code: HttpStatus.CONFLICT,
    message: SPACE_ERROR.ALREADY_INTERESTED,
  },
  NOT_INTERESTED: {
    code: HttpStatus.CONFLICT,
    message: SPACE_ERROR.NOT_INTERESTED,
  },
  RENTAL_TYPE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SPACE_ERROR.RENTAL_TYPE_NOT_FOUND,
  },
  RENTAL_TYPE_ERROR: {
    code: HttpStatus.BAD_REQUEST,
    message: SPACE_ERROR.RENTAL_TYPE_ERROR,
  },
  CURRENT_LOCATION_BAD_REQUEST: {
    code: HttpStatus.BAD_REQUEST,
    message: SPACE_ERROR.CURRENT_LOCATION_BAD_REQUEST,
  },
  REFUND_POLICY_LENGTH: {
    code: HttpStatus.BAD_REQUEST,
    message: SPACE_ERROR.REFUND_POLICY_LENGTH,
  },
  REFUND_POLICY_DAYS_BEFORE_TYPE: {
    code: HttpStatus.BAD_REQUEST,
    message: SPACE_ERROR.REFUND_POLICY_DAYS_BEFORE_TYPE,
  },
  MAIN_SPACE_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: SPACE_ERROR.MAIN_SPACE_EXISTS,
  },
};
