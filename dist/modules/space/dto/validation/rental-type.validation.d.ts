import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const RENTAL_TYPE: {
    readonly TIME: "TIME";
    readonly PACKAGE: "PACKAGE";
};
export declare enum RENTAL_TYPE_ENUM {
    TIME = 1,
    PACKAGE = 2
}
export declare const RENTAL_TYPE_KEYS: string[];
export declare const RENTAL_TYPE_VALUES: ("TIME" | "PACKAGE")[];
export declare class RentalTypeValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const RentalTypeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
export declare const rentalTypeStringToNumber: (rentalType: string) => RENTAL_TYPE_ENUM;
export declare const rentalTypeNumberToString: (rentalType: number) => "TIME" | "PACKAGE";
export declare const RentalTypeRequestTransForm: () => PropertyDecorator;
export declare const RentalTypeResTransForm: () => PropertyDecorator;
export declare const RentalTypeReqDecorator: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
