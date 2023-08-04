import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class TimeValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const TimeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
