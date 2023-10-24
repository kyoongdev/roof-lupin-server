import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

export const RENTAL_TYPE = {
  TIME: 'TIME',
  PACKAGE: 'PACKAGE',
} as const;

export enum RENTAL_TYPE_ENUM {
  TIME = 1,
  PACKAGE = 2,
}
export const RENTAL_TYPE_KEYS = Object.keys(RENTAL_TYPE);
export const RENTAL_TYPE_VALUES = Object.values(RENTAL_TYPE);

@ValidatorConstraint()
export class RentalTypeValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value !== RENTAL_TYPE_ENUM.TIME && value !== RENTAL_TYPE_ENUM.PACKAGE) return false;

    return true;
  }
}

@ValidatorConstraint()
export class RentalTypeArrayValidateConstraint implements ValidatorConstraintInterface {
  validate(
    value: { [key: string]: any; rentalType: number }[] | null,
    validationArguments?: ValidationArguments
  ): boolean | Promise<boolean> {
    if (!value) return true;
    const rentalTypeArray = value.map((item) => item.rentalType);

    if (rentalTypeArray.some((item) => item !== RENTAL_TYPE_ENUM.TIME && item !== RENTAL_TYPE_ENUM.PACKAGE))
      return false;

    return true;
  }
}

export const RentalTypeValidation = BaseValidator(
  RentalTypeValidateConstraint,
  'rentalType 옵션은 다음 중 하나여야 합니다: ' + RENTAL_TYPE_VALUES.join(', ') + '.'
);

export const RentalTypeArrayValidation = BaseValidator(
  RentalTypeArrayValidateConstraint,
  'rentalType 옵션은 다음 중 하나여야 합니다: ' + RENTAL_TYPE_VALUES.join(', ') + '.'
);

export const rentalTypeStringToNumber = (rentalType: string) => {
  if (rentalType === RENTAL_TYPE.TIME) {
    return RENTAL_TYPE_ENUM.TIME;
  } else if (rentalType === RENTAL_TYPE.PACKAGE) {
    return RENTAL_TYPE_ENUM.PACKAGE;
  } else return null;
};

export const rentalTypeArrayStringToNumber = (data: { [key: string]: any; rentalType: string }[] | null) => {
  if (!data) return null;
  return data.map((item) => {
    return {
      ...item,
      rentalType: rentalTypeStringToNumber(item.rentalType),
    };
  });
};

export const rentalTypeNumberToString = (rentalType: number) => {
  if (rentalType === RENTAL_TYPE_ENUM.TIME) {
    return RENTAL_TYPE.TIME;
  } else if (rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
    return RENTAL_TYPE.PACKAGE;
  } else return null;
};

export const RentalTypeRequestTransForm = () => Transform(({ value }) => rentalTypeStringToNumber(value));
export const RentalTypeArrayRequestTransForm = () => Transform(({ value }) => rentalTypeArrayStringToNumber(value));
export const RentalTypeResTransForm = () => Transform(({ value }) => rentalTypeNumberToString(value));
export const RentalTypeReqDecorator = (nullable = false) =>
  applyDecorators(
    RentalTypeRequestTransForm(),
    RentalTypeValidation(),
    ApiProperty({
      type: 'string',
      nullable,
      example: RENTAL_TYPE_KEYS,
      description: RENTAL_TYPE_KEYS.join(','),
    })
  );

export const RentalTypeArrayReqDecorator = (nullable = false) =>
  applyDecorators(RentalTypeArrayRequestTransForm(), RentalTypeArrayValidation());
