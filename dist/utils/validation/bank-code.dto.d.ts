import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare const BANK_CODES: string[];
export declare const BANK_NAMES: string[];
export declare class BankCodeConstraint implements ValidatorConstraintInterface {
    validate(value: string | null, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const BankCodeValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
export declare const bankCodeToName: (code: string) => any;
export declare const bankNameToCode: (name: string) => string;
export declare const BankCodeRequestTransForm: () => PropertyDecorator;
export declare const BankCodeReqDecorator: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
