import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from './base-validator';

interface Period {
  startAt: number;
  endAt: number;
}

@ValidatorConstraint()
export class PeriodValidateConstraint implements ValidatorConstraintInterface {
  validate(value: Period, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value.startAt > value.endAt) return false;
    return true;
  }
}

export const PeriodValidation = BaseValidator(PeriodValidateConstraint, 'startAt는 endAt보다 작아야 합니다.');
