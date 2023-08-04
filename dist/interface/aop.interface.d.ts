import { NestInterceptor } from '@nestjs/common';
export type CreateAOPDecorator = (metadataKey: symbol | string, metadata?: unknown) => MethodDecorator;
export type ApplyMetaData = <K extends string | symbol = string, V = any>(metaDataKey: K, metaDataValue: V) => MethodDecorator;
export interface BaseAOPMetaData {
    metadata?: unknown;
    aopSymbol: symbol;
}
export interface AOPMetaData {
    metadata?: unknown;
    aopSymbol: symbol;
    originalFn: Function;
}
export type ApplyAOPFunction = (_: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export type AOPParams<T extends Function = Function, M = unknown> = {
    instance: any;
    methodName: string;
    method: T;
    metadata: M;
};
export interface AOPDecorator<T extends Function = Function, M = unknown> {
    execute(params: AOPParams<T, M>): T;
}
export interface AOPInterceptorDecorator<T extends Function = Function, M = unknown> extends NestInterceptor {
    execute(params: AOPParams<T, M>): T;
}
