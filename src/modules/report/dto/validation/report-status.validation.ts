import { Transform } from 'class-transformer';
import { ValidatorConstraint } from 'class-validator';

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

export const DayResponseTransForm = () => Transform(({ value }) => reportStatusNumberToString(value));
