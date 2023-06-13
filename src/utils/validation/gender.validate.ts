import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import {
  IsNumber,
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

import { BaseValidator } from '@/utils/validation';

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export const GENDER_VALUE = Object.keys(GENDER);

@ValidatorConstraint()
export class IsGenderValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    console.log('123', { value });
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
export const GenderReqDecorators = () =>
  applyDecorators(
    GenderReqTransForm(),
    GenderValidation(),
    ApiProperty({ type: 'string', nullable: true, example: GENDER_VALUE, description: '성별 : MALE | FEMALE' })
  );
