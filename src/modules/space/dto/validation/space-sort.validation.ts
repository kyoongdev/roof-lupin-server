import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { BaseValidator } from '@/utils/validation/base-validator';

export const SPACE_SORT_OPTION = {
  POPULARITY: 'POPULARITY',
  RECENT: 'RECENT',
  DISTANCE: 'DISTANCE',
  PRICE_HIGH: 'PRICE_HIGH',
  PRICE_LOW: 'PRICE_LOW',
} as const;

export const SPACE_SORT_OPTION_VALUES = Object.values(SPACE_SORT_OPTION);

@ValidatorConstraint()
export class SpaceSortValidateConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!SPACE_SORT_OPTION_VALUES.includes(value as any)) return false;
    return true;
  }
}

export const SpaceSortValidation = BaseValidator(
  SpaceSortValidateConstraint,
  '정렬 옵션은 다음 중 하나여야 합니다: ' + SPACE_SORT_OPTION_VALUES.join(', ') + '.'
);
