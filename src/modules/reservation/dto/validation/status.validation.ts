import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from '@/utils';

export const RESERVATION_STATUS = {
  APPROVED_PENDING: 'APPROVED_PENDING',
  APPROVED: 'APPROVED',
  USED: 'USED',
  CANCELED: 'CANCELED',
  REFUND: 'REFUND',
  BEFORE_USAGE: 'BEFORE_USAGE',
} as const;

@ValidatorConstraint()
export class ReservationStatusConstraint implements ValidatorConstraintInterface {
  validate(value: string | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (
      value !== RESERVATION_STATUS.APPROVED &&
      value !== RESERVATION_STATUS.APPROVED_PENDING &&
      value !== RESERVATION_STATUS.BEFORE_USAGE &&
      value !== RESERVATION_STATUS.CANCELED &&
      value !== RESERVATION_STATUS.REFUND &&
      value !== RESERVATION_STATUS.USED
    ) {
      return false;
    }
    return true;
  }
}

export const ReservationStatusValidation = BaseValidator(
  ReservationStatusConstraint,
  'reservationStatus 옵션은 다음 중 하나여야 합니다: ' + Object.values(RESERVATION_STATUS).join(', ') + '.'
);

export const ReservationStatusReqDecorator = (nullable = false) =>
  applyDecorators(
    ReservationStatusValidation,
    ApiProperty({
      type: 'string',
      enum: Object.values(RESERVATION_STATUS),
      example: Object.values(RESERVATION_STATUS).join(' | '),
      nullable,
    })
  );
