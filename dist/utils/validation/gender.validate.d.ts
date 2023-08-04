import { type ValidationArguments, type ValidatorConstraintInterface } from 'class-validator';
export declare const GENDER: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
};
export declare const GENDER_VALUE: string[];
export declare class IsGenderValidateConstraint implements ValidatorConstraintInterface {
    validate(value: number | null, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
}
export declare const GenderValidation: (validationOptions?: import("class-validator").ValidationOptions) => (object: object, propertyName: string) => void;
export declare const genderNumberToString: (gender: number) => "MALE" | "FEMALE";
export declare const genderStringToNumber: (gender: string) => 1 | 2;
export declare const GenderReqTransForm: () => PropertyDecorator;
export declare const GenderResTransForm: () => PropertyDecorator;
export declare const GenderReqDecorators: (nullable?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
