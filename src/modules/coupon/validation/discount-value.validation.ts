import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation';

export enum DISCOUNT_TYPE_ENUM {
  PERCENTAGE = 1,
  VALUE = 2,
}

export const DISCOUNT_TYPE = {
  PERCENTAGE: 'PERCENTAGE',
  VALUE: 'VALUE',
} as const;

export const DISCOUNT_TYPE_KEYS = Object.keys(DISCOUNT_TYPE);
export const DISCOUNT_TYPE_VALUES = Object.values(DISCOUNT_TYPE);

@ValidatorConstraint()
export class DiscountTypeValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null): boolean | Promise<boolean> {
    if (value !== DISCOUNT_TYPE_ENUM.PERCENTAGE && value !== DISCOUNT_TYPE_ENUM.VALUE) return false;

    return true;
  }
}

export const DiscountTypeValidation = BaseValidator(
  DiscountTypeValidateConstraint,
  'discountType 옵션은 다음 중 하나여야 합니다: ' + DISCOUNT_TYPE_VALUES.join(', ') + '.'
);

export const discountTypeStringToNumber = (discountType: string) => {
  if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
    return DISCOUNT_TYPE_ENUM.PERCENTAGE;
  } else if (discountType === DISCOUNT_TYPE.VALUE) {
    return DISCOUNT_TYPE_ENUM.VALUE;
  } else return null;
};

export const discountTypeNumberToString = (discountType: number) => {
  if (discountType === DISCOUNT_TYPE_ENUM.PERCENTAGE) {
    return DISCOUNT_TYPE.PERCENTAGE;
  } else if (discountType === DISCOUNT_TYPE_ENUM.VALUE) {
    return DISCOUNT_TYPE.VALUE;
  } else return null;
};

export const DiscountTypeRequestTransform = () => Transform(({ value }) => discountTypeStringToNumber(value));
export const DiscountTypeResTransform = () => Transform(({ value }) => discountTypeNumberToString(value));
export const DiscountTypeReqDecorator = (nullable = false) =>
  applyDecorators(
    DiscountTypeRequestTransform(),
    DiscountTypeValidation(),
    ApiProperty({
      type: 'string',
      nullable,
      example: DISCOUNT_TYPE_KEYS,
      description: DISCOUNT_TYPE_KEYS.join(','),
    })
  );
