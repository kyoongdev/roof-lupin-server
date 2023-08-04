import { type ValidationArguments, type ValidatorConstraintInterface } from 'class-validator';
export declare class PhoneNumberValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const PhoneNumberValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
