import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const SPACE_SORT_OPTION: {
    readonly POPULARITY: "POPULARITY";
    readonly RECENT: "RECENT";
    readonly DISTANCE: "DISTANCE";
    readonly PRICE_HIGH: "PRICE_HIGH";
    readonly PRICE_LOW: "PRICE_LOW";
};
export declare const SPACE_SORT_OPTION_VALUES: ("POPULARITY" | "RECENT" | "DISTANCE" | "PRICE_HIGH" | "PRICE_LOW")[];
export declare class SpaceSortValidateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const SpaceSortValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
