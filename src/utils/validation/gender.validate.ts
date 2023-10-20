import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from '@/utils/validation';

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export const GENDER_VALUE = Object.keys(GENDER);

@ValidatorConstraint()
export class IsGenderValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value !== 1 && value !== 2) return false;

    return true;
  }
}

export const GenderValidation = BaseValidator(IsGenderValidateConstraint, 'MALE과 FEMALE 중에서만 입력해주세요.');

export const genderNumberToString = (gender: number) => {
  if (gender === 1) {
    return GENDER.MALE;
  } else if (gender === 2) {
    return GENDER.FEMALE;
  } else {
    return null;
  }
};

export const genderStringToNumber = (gender: string) => {
  if (gender === GENDER.MALE) {
    return 1;
  } else if (gender === GENDER.FEMALE) {
    return 2;
  } else {
    return null;
  }
};

export const GenderReqTransForm = () =>
  Transform(({ value }) => {
    if (value === GENDER.MALE) {
      return 1;
    } else if (value === GENDER.FEMALE) {
      return 2;
    } else {
      return null;
    }
  });
export const GenderResTransForm = () => Transform(({ value }) => genderNumberToString(value));
export const GenderReqDecorators = (nullable = false) =>
  applyDecorators(
    Property({ apiProperty: { type: 'number', nullable, example: GENDER_VALUE, description: '성별 : MALE | FEMALE' } }),
    GenderReqTransForm(),
    GenderValidation()
  );
