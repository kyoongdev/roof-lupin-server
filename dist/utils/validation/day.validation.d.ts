import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const DAY: {
    MONDAY: string;
    TUESDAY: string;
    WEDNESDAY: string;
    THURSDAY: string;
    FRIDAY: string;
    SATURDAY: string;
    SUNDAY: string;
    HOLIDAY: string;
};
export declare enum DAY_ENUM {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    HOLIDAY = 7
}
export declare const DAY_KEYS: string[];
export declare const DAY_VALUES: string[];
export declare const getDay: (year: number, month: number, day: number) => number;
export declare class DayValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const DayValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
export declare const dayStringToNumber: (day: string) => DAY_ENUM;
export declare const dayNumberToString: (day: number) => string;
export declare const DayRequestTransForm: () => PropertyDecorator;
export declare const DayResponseTransForm: () => PropertyDecorator;
export declare const DayResDecorator: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const DayReqDecorator: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
