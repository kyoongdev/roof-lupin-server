import { mixin } from '@nestjs/common';

import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const WordLengthValidateFunc = (...lengths: number[]) => {
  @ValidatorConstraint()
  class WordLengthValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
      if (!lengths.includes(value.length)) return false;

      return true;
    }
  }
  return mixin<WordLengthValidateConstraint>(WordLengthValidateConstraint);
};

export const WordLengthValidation = (...length: number[]) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `길이는 ${length.join(',')} 중 하나입니다.`,
      },
      constraints: [],
      validator: WordLengthValidateFunc(...length),
    });
  };
};
