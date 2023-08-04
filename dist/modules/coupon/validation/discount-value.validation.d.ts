import { ValidatorConstraintInterface } from 'class-validator';
export declare enum DISCOUNT_TYPE_ENUM {
    PERCENTAGE = 1,
    VALUE = 2
}
export declare const DISCOUNT_TYPE: {
    readonly PERCENTAGE: "PERCENTAGE";
    readonly VALUE: "VALUE";
};
export declare const DISCOUNT_TYPE_KEYS: string[];
export declare const DISCOUNT_TYPE_VALUES: ("PERCENTAGE" | "VALUE")[];
export declare class DiscountTypeValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number | null): boolean | Promise<boolean>;
}
export declare const DiscountTypeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
export declare const discountTypeStringToNumber: (discountType: string) => DISCOUNT_TYPE_ENUM;
export declare const discountTypeNumberToString: (discountType: number) => "PERCENTAGE" | "VALUE";
export declare const DiscountTypeRequestTransform: () => PropertyDecorator;
export declare const DiscountTypeResTransform: () => PropertyDecorator;
export declare const DiscountTypeReqDecorator: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
