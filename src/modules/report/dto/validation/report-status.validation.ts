import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { ValidatorConstraint } from 'class-validator';
import { Property } from 'cumuco-nestjs';

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

export const reportStatusNumberToString = (status: number) => {
  if (status === ReportStatus.WAITING) {
    return REPORT_STATUS.WAITING;
  } else return REPORT_STATUS.PROCESSED;
};

export const ReportStatusResponseTransForm = () => Transform(({ value }) => reportStatusNumberToString(value));
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
