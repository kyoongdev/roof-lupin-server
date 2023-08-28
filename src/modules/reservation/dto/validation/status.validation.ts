import { applyDecorators } from '@nestjs/common';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from '@/utils';

export const RESERVATION_STATUS = {
  APPROVED_PENDING: 'APPROVED_PENDING',
  APPROVED: 'APPROVED',
  USED: 'USED',
  USER_CANCELED: 'USER_CANCELED',
  HOST_CANCELED: 'HOST_CANCELED',
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
      value !== RESERVATION_STATUS.HOST_CANCELED &&
      value !== RESERVATION_STATUS.REFUND &&
      value !== RESERVATION_STATUS.USED &&
      value !== RESERVATION_STATUS.USER_CANCELED
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
    Property({
      apiProperty: {
        type: 'string',
        enum: Object.values(RESERVATION_STATUS),
        example: Object.values(RESERVATION_STATUS).join(' | '),
        nullable,
      },
    })
  );
