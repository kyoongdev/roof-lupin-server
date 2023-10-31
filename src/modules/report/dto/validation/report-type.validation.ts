import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from '@/utils';

export const REPORT_TYPE = {
  SPACE: 'SPACE',
  REVIEW: 'REVIEW',
  QNA: 'QNA',
};

export const REPORT_TYPE_VALUES = Object.values(REPORT_TYPE);
export const REPORT_TYPE_KEYS = Object.keys(REPORT_TYPE);

@ValidatorConstraint()
export class ReportTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!REPORT_TYPE_VALUES.includes(value)) return false;

    return true;
  }
}

export const ReportTypeValidation = BaseValidator(
  ReportTypeConstraint,
  'reportType 옵션은 다음 중 하나여야 합니다: ' + REPORT_TYPE_VALUES.join(', ') + '.'
);

export const ReportTypeReqDecorator = (nullable = false) =>
  applyDecorators(
    ReportTypeValidation(),
    ApiProperty({
      type: 'string',
      description: '신고 종류 (공간, QnA, 리뷰)',
      enum: REPORT_TYPE_VALUES,
      example: REPORT_TYPE_VALUES.join(' | '),
      nullable,
    })
  );
