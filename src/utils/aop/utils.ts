import { applyDecorators } from '@nestjs/common';

import type {
  AOPMetaData,
  ApplyAOPFunction,
  ApplyMetaData,
  BaseAOPMetaData,
  CreateAOPDecorator,
} from '@/interface/aop.interface';

export const AOPSymbol = Symbol('AOP_DECORATOR');
export const AOPPrefix = ':AOP';

export const applyMetaData: ApplyMetaData = (metaDataKey, metaDataValue): MethodDecorator => {
  return (_: any, __: string | symbol, descriptor: PropertyDescriptor) => {
    if (!Reflect.hasMetadata(metaDataKey, descriptor.value)) {
      Reflect.defineMetadata(metaDataKey, [], descriptor.value);
    }
    const metaDataValues: any[] = Reflect.getMetadata(metaDataKey, descriptor.value);
    metaDataValues.push({ ...metaDataValue, originalFn: descriptor.value });
    return descriptor;
  };
};

export const applyAOPFunction: ApplyAOPFunction = (_, propertyKey, descriptor) => {
  const originalFn = descriptor.value;
  descriptor.value = function (this: any, ...args: any[]) {
    if (this[AOPSymbol]?.[propertyKey]) {
      return this[AOPSymbol][propertyKey].apply(this, args);
    }
    return originalFn.apply(this, args);
  };

  Object.defineProperty(descriptor.value, 'name', {
    value: originalFn?.name + AOPPrefix,
    writable: false,
  });
  Object.setPrototypeOf(descriptor.value, originalFn);
};

export const createAOPDecorator: CreateAOPDecorator = (metaDataKey, metadata): MethodDecorator =>
  applyDecorators(
    applyMetaData<symbol | string, BaseAOPMetaData>(metaDataKey, {
      metadata,
      aopSymbol: AOPSymbol,
    }),
    applyAOPFunction
  );