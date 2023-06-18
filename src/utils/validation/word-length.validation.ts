import { mixin } from '@nestjs/common';

import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const WordLengthValidateFunc = (length: number) => {
  @ValidatorConstraint()
  class WordLengthValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
      if (value.length !== length) return false;

      return true;
    }
  }
  return mixin<WordLengthValidateConstraint>(WordLengthValidateConstraint);
};

export const WordLengthValidation = (length: number) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `길이가 ${length}이어야 합니다.`,
      },
      constraints: [],
      validator: WordLengthValidateFunc(length),
    });
  };
};
