import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Property } from 'cumuco-nestjs';

import { BaseValidator } from './base-validator';

export const DAY = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
  HOLIDAY: 'HOLIDAY',
};

export enum DAY_ENUM {
  SUNDAY = 0,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  HOLIDAY,
}

export const DAY_KEYS = Object.keys(DAY);
export const DAY_VALUES = Object.values(DAY);

export const getDay = (year: number, month: number, day: number, isHoliday?: boolean) => {
  const date = new Date(year, month - 1, day);

  return isHoliday ? DAY_ENUM.HOLIDAY : date.getDay();
};

@ValidatorConstraint()
export class DayValidateConstraint implements ValidatorConstraintInterface {
  validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if (
      value !== DAY_ENUM.SUNDAY &&
      value !== DAY_ENUM.MONDAY &&
      value !== DAY_ENUM.TUESDAY &&
      value !== DAY_ENUM.WEDNESDAY &&
      value !== DAY_ENUM.THURSDAY &&
      value !== DAY_ENUM.FRIDAY &&
      value !== DAY_ENUM.SATURDAY &&
      value !== DAY_ENUM.HOLIDAY
    )
      return false;

    return true;
  }
}

export const DayValidation = BaseValidator(
  DayValidateConstraint,
  'day 옵션은 다음 중 하나여야 합니다: ' + DAY_VALUES.join(', ') + '.'
);

export const dayStringToNumber = (day: string) => {
  switch (day) {
    case DAY.MONDAY:
      return DAY_ENUM.MONDAY;
    case DAY.TUESDAY:
      return DAY_ENUM.TUESDAY;
    case DAY.WEDNESDAY:
      return DAY_ENUM.WEDNESDAY;
    case DAY.THURSDAY:
      return DAY_ENUM.THURSDAY;
    case DAY.FRIDAY:
      return DAY_ENUM.FRIDAY;
    case DAY.SATURDAY:
      return DAY_ENUM.SATURDAY;
    case DAY.SUNDAY:
      return DAY_ENUM.SUNDAY;
    case DAY.HOLIDAY:
      return DAY_ENUM.HOLIDAY;
    default:
      return null;
  }
};

export const dayNumberToString = (day: number) => {
  switch (day) {
    case DAY_ENUM.MONDAY:
      return DAY.MONDAY;
    case DAY_ENUM.TUESDAY:
      return DAY.TUESDAY;
    case DAY_ENUM.WEDNESDAY:
      return DAY.WEDNESDAY;
    case DAY_ENUM.THURSDAY:
      return DAY.THURSDAY;
    case DAY_ENUM.FRIDAY:
      return DAY.FRIDAY;
    case DAY_ENUM.SATURDAY:
      return DAY.SATURDAY;
    case DAY_ENUM.SUNDAY:
      return DAY.SUNDAY;
    case DAY_ENUM.HOLIDAY:
      return DAY.HOLIDAY;
    default:
      return null;
  }
};

export const DayRequestTransForm = () => Transform(({ value }) => dayStringToNumber(value));
export const DayResponseTransForm = () => Transform(({ value }) => dayNumberToString(value));
export const DayResDecorator = (nullable = false) =>
  applyDecorators(
    DayResponseTransForm(),
    Property({
      apiProperty: {
        description: '요일',
        enum: DAY_VALUES,
        type: 'string',
        example: DAY_VALUES.join(' | '),
        nullable,
      },
    })
  );

export const DayReqDecorator = (nullable = false) =>
  applyDecorators(
    DayRequestTransForm(),
    DayValidation(),
    ApiProperty({
      description: '요일',
      enum: DAY_VALUES,
      nullable,
      type: 'number',
      example: DAY_VALUES.join(' | '),
    })
  );
