import { type ValidationArguments, type ValidatorConstraintInterface } from 'class-validator';
export declare class RentalTypeValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const RentalTypeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
