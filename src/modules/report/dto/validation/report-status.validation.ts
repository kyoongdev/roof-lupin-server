import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from '@/utils';

export enum ReportStatus {
  WAITING = 1,
  PROCESSED = 2,
}

export const REPORT_STATUS = {
  WAITING: '대기',
  PROCESSED: '처리됨',
};

export const REPORT_STATUS_VALUES = Object.values(REPORT_STATUS);
export const REPORT_STATUS_KEYS = Object.keys(REPORT_STATUS);

@ValidatorConstraint()
export class ReportStatusConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (!REPORT_STATUS_VALUES.includes(value)) return false;

    return true;
  }
}

export const ReportStatusValidation = BaseValidator(
  ReportStatusConstraint,
  'reportStatus 옵션은 다음 중 하나여야 합니다: ' + REPORT_STATUS_VALUES.join(', ') + '.'
);

export const reportStatusNumberToString = (status: number) => {
  if (status === ReportStatus.WAITING) {
    return REPORT_STATUS.WAITING;
  } else return REPORT_STATUS.PROCESSED;
};

export const reportStatusStringToNumber = (status: string) => {
  if (status === REPORT_STATUS.WAITING) {
    return ReportStatus.WAITING;
  } else return ReportStatus.PROCESSED;
};

export const ReportStatusResponseTransForm = () => Transform(({ value }) => reportStatusNumberToString(value));
export const ReportStatusRequestTransForm = () => Transform(({ value }) => reportStatusStringToNumber(value));
export const ReportStatusResDecorator = (nullable = false) =>
  applyDecorators(
    ReportStatusResponseTransForm(),
    Property({
      apiProperty: {
        description: '요일',
        enum: REPORT_STATUS_VALUES,
        type: 'string',
        example: REPORT_STATUS_VALUES.join(' | '),
        nullable,
      },
    })
  );

export const ReportStatusReqDecorator = (nullable = false) =>
  applyDecorators(
    ReportStatusValidation(),
    ReportStatusRequestTransForm(),
    Property({
      apiProperty: {
        type: 'string',
        enum: REPORT_STATUS_VALUES,
        example: REPORT_STATUS_VALUES.join(' | '),
        nullable,
      },
    })
  );
