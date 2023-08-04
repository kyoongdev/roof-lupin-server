import type { ApplyAOPFunction, ApplyMetaData, CreateAOPDecorator } from '@/interface/aop.interface';
export declare const AOPSymbol: unique symbol;
export declare const AOPPrefix = ":AOP";
export declare const applyMetaData: ApplyMetaData;
export declare const applyAOPFunction: ApplyAOPFunction;
export declare const createAOPDecorator: CreateAOPDecorator;
export declare const createAOPInterceptor: CreateAOPDecorator;
