export declare const AOP_KEY: unique symbol;
export declare const AOP: (metadataKey: string | symbol) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
