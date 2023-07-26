import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

export const ADMIN_SPACE_SORT_OPTION = {
  RECENT: 'RECENT',
  PRICE_HIGH: 'PRICE_HIGH',
  PRICE_LOW: 'PRICE_LOW',
  REVIEW_COUNT_HIGH: 'REVIEW_COUNT_HIGH',
  REVIEW_COUNT_LOW: 'REVIEW_COUNT_LOW',
  AVERAGE_RATING_HIGH: 'AVERAGE_RATING_HIGH',
  AVERAGE_RATING_LOW: 'AVERAGE_RATING_LOW',
} as const;

export const ADMIN_SPACE_SORT_OPTION_VALUES = Object.values(ADMIN_SPACE_SORT_OPTION);

@ValidatorConstraint()
export class AdminSpaceSortValidateConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!ADMIN_SPACE_SORT_OPTION_VALUES.includes(value as any)) return false;
    return true;
  }
}

export const AdminSpaceSortValidation = BaseValidator(
  AdminSpaceSortValidateConstraint,
  '정렬 옵션은 다음 중 하나여야 합니다: ' + ADMIN_SPACE_SORT_OPTION_VALUES.join(', ') + '.'
);
