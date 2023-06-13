import { Transform } from 'class-transformer';
import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation';

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export const GENDER_VALUE = Object.keys(GENDER);

@ValidatorConstraint()
export class IsGenderValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    console.log(value);
    if (value !== 1 && value !== 2) return false;

    return true;
  }
}

export const GenderValidation = BaseValidator(IsGenderValidateConstraint, 'MALE과 FEMALE 중에서만 입력해주세요.');

export const GenderTransForm = () =>
  Transform(({ value }) => {
    if (value === GENDER.MALE) {
      return 1;
    } else if (value === GENDER.FEMALE) {
      return 2;
    } else {
      return 3;
    }
  });
