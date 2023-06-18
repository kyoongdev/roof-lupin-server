import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation';

export const REVIEWS_SORT = {
  CREATED_AT: 'CREATED_AT',
  SCORE_HIGH: 'SCORE_HIGH',
  SCORE_LOW: 'SCORE_LOW',
} as const;

export const REVIEWS_SORT_KEYS = Object.keys(REVIEWS_SORT);

@ValidatorConstraint()
export class ReviewScoreValidateConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (value !== REVIEWS_SORT.SCORE_HIGH && value !== REVIEWS_SORT.SCORE_LOW && value !== REVIEWS_SORT.CREATED_AT)
      return false;

    return true;
  }
}

export const RentalTypeValidation = BaseValidator(
  ReviewScoreValidateConstraint,
  'sort 옵션은 다음 중 하나여야 합니다: ' + REVIEWS_SORT_KEYS.join(', ') + '.'
);
