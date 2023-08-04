import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const REVIEWS_SORT: {
    readonly CREATED_AT: "CREATED_AT";
    readonly SCORE_HIGH: "SCORE_HIGH";
    readonly SCORE_LOW: "SCORE_LOW";
};
export declare const REVIEWS_SORT_KEYS: string[];
export declare class ReviewScoreValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const RentalTypeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
