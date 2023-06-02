import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation';

@ValidatorConstraint()
export class IsGenderValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!Number.isInteger(value)) return false;
    if (value !== 1 && value !== 2) return false;

    return true;
  }
}

export const GenderValidation = BaseValidator(IsGenderValidateConstraint, '1(남성)과 2(여성) 중에서만 입력해주세요.');
