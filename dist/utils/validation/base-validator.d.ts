import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function BaseValidator(validator: ValidatorConstraintInterface | Function, message?: string): (validationOptions?: ValidationOptions) => (object: object, propertyName: string) => void;
