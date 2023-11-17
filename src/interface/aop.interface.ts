import { NestInterceptor } from '@nestjs/common';

export type CreateAOPDecorator = (metadataKey: symbol | string, metadata?: unknown) => MethodDecorator;
export type ApplyMetaData = <K extends string | symbol = string, V = any>(
  metaDataKey: K,
  metaDataValue: V
) => MethodDecorator;

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

/**
 * Aspect 선언시 구현이 필요합니다.
 */
export interface AOPDecorator<T extends Function = Function, M = unknown> {
  execute(params: AOPParams<T, M>): T;
}

export interface AOPInterceptorDecorator<T extends Function = Function, M = unknown> extends NestInterceptor {
  execute(params: AOPParams<T, M>): T;
}

/* eslint-disable @typescript-eslint/ban-types */
export type WrapParams<T extends Function = Function, M = unknown> = {
  instance: any;
  methodName: string;
  method: T;
  metadata: M;
};

/**
 * Aspect 선언시 구현이 필요합니다.
 */
export interface LazyDecorator<T extends Function = Function, M = unknown> {
  wrap(params: WrapParams<T, M>): T;
}
