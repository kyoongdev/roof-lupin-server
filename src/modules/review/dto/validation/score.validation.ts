import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

@ValidatorConstraint()
export class IsScoreValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!Number.isInteger(value)) return false;
    if (value < 0 || value > 5) return false;

    return true;
  }
}

export const ScoreValidation = BaseValidator(IsScoreValidateConstraint);
