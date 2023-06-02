import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';

export function BaseValidator(validator: ValidatorConstraintInterface | Function, message = 'Invalid Request') {
  return (validationOptions?: ValidationOptions) => {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: {
          ...validationOptions,
          message: validationOptions.message ?? message,
        },
        constraints: [],
        validator,
      });
    };
  };
}
