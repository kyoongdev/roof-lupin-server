import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsScoreValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const ScoreValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
