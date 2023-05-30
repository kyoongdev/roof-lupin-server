import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';

export function BaseValidator(validator: ValidatorConstraintInterface | Function) {
  return (validationOptions?: ValidationOptions) => {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator,
      });
    };
  };
}
