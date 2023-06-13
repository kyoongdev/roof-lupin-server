import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation';

@ValidatorConstraint()
export class PhoneNumberValidateConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value.length !== 11) return false;

    return true;
  }
}

export const PhoneNumberValidation = BaseValidator(
  PhoneNumberValidateConstraint,
  "핸드폰 번호는 11자리로 입력해주세요. '-' 제외"
);
