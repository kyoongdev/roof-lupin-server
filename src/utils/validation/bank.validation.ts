import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BANK_CODE } from '@/common/constants';

import { BaseValidator } from './base-validator';

export const BANK_CODES = Object.keys(BANK_CODE);
export const BANK_NAMES = Object.values(BANK_CODE);

@ValidatorConstraint()
export class BankCodeConstraint implements ValidatorConstraintInterface {
  validate(value: string | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!BANK_CODES.includes(value)) return false;

    return true;
  }
}
export const BankCodeValidation = BaseValidator(
  BankCodeConstraint,
  'bankCode 옵션은 다음 중 하나여야 합니다: ' + BANK_CODES.join(', ') + '.'
);

export const bankCodeToName = (code: string) => {
  if (!BANK_CODES.includes(code)) return null;
  return BANK_CODE[code];
};

export const bankNameToCode = (name: string) => {
  if (!BANK_NAMES.includes(name)) return null;

  return BANK_CODES[BANK_NAMES.indexOf(name)];
};

export const BankCodeReqDecorator = (nullable = false) =>
  applyDecorators(
    BankCodeValidation(),

    Property({
      apiProperty: {
        description: '은행명',
        type: 'string',
        enum: BANK_NAMES,
        nullable,
        example: BANK_NAMES.join(' | '),
      },
    })
  );
