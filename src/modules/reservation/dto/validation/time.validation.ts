import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

@ValidatorConstraint()
export class TimeValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!Number.isInteger(value)) return false;
    if (value < 0 || value > 24) return false;

    return true;
  }
}

export const TimeValidation = BaseValidator(TimeValidateConstraint);
