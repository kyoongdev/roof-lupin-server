import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

export const RENTAL_TYPE = {
  TIME: 'TIME',
  PACKAGE: 'PACKAGE',
} as const;

export const RENTAL_TYPE_KEYS = Object.keys(RENTAL_TYPE);
export const RENTAL_TYPE_VALUES = Object.values(RENTAL_TYPE);

@ValidatorConstraint()
export class RentalTypeValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value !== 1 && value !== 2) return false;

    return true;
  }
}

export const RentalTypeValidation = BaseValidator(
  RentalTypeValidateConstraint,
  'rentalType 옵션은 다음 중 하나여야 합니다: ' + RENTAL_TYPE_VALUES.join(', ') + '.'
);

export const rentalTypeStringToNumber = (rentalType: string) => {
  if (rentalType === RENTAL_TYPE.TIME) {
    return 1;
  } else if (rentalType === RENTAL_TYPE.PACKAGE) {
    return 2;
  } else return null;
};

export const rentalTypeNumberToString = (rentalType: number) => {
  if (rentalType === 1) {
    return RENTAL_TYPE.TIME;
  } else if (rentalType === 2) {
    return RENTAL_TYPE.PACKAGE;
  } else return null;
};

export const RentalTypeRequestTransForm = () => Transform(({ value }) => rentalTypeStringToNumber(value));
export const RentalTypeResTransForm = () => Transform(({ value }) => rentalTypeNumberToString(value));
export const RentalTypeReqDecorator = () => applyDecorators(RentalTypeRequestTransForm(), RentalTypeValidation());
