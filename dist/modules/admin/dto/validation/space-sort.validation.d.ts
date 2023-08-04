import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const ADMIN_SPACE_SORT_OPTION: {
    readonly RECENT: "RECENT";
    readonly PRICE_HIGH: "PRICE_HIGH";
    readonly PRICE_LOW: "PRICE_LOW";
    readonly REVIEW_COUNT_HIGH: "REVIEW_COUNT_HIGH";
    readonly REVIEW_COUNT_LOW: "REVIEW_COUNT_LOW";
    readonly AVERAGE_RATING_HIGH: "AVERAGE_RATING_HIGH";
    readonly AVERAGE_RATING_LOW: "AVERAGE_RATING_LOW";
};
export declare const ADMIN_SPACE_SORT_OPTION_VALUES: ("RECENT" | "PRICE_HIGH" | "PRICE_LOW" | "REVIEW_COUNT_HIGH" | "REVIEW_COUNT_LOW" | "AVERAGE_RATING_HIGH" | "AVERAGE_RATING_LOW")[];
export declare class AdminSpaceSortValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const AdminSpaceSortValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
