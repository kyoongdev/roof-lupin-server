import { applyDecorators } from '@nestjs/common';

const aopSymbol = Symbol('AOP_DECORATOR');

export const AddMetadata = <K extends string | symbol = string, V = any>(
  metadataKey: K,
  metadataValue: V
): MethodDecorator => {
  const decoratorFactory = (
    _: any,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): TypedPropertyDescriptor<any> => {
    if (!Reflect.hasMetadata(metadataKey, descriptor.value)) {
      Reflect.defineMetadata(metadataKey, [], descriptor.value);
    }
    const metadataValues: V[] = Reflect.getMetadata(metadataKey, descriptor.value);

    metadataValues.push(metadataValue);
    return descriptor;
  };

  decoratorFactory.key = metadataKey;
  return decoratorFactory;
};

export const createDecorator = (metadataKey: symbol | string, metadata?: unknown): MethodDecorator =>
  applyDecorators(
    (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      if (descriptor.value) {
        Object.defineProperty(descriptor.value, 'name', {
          value: descriptor.value?.name + ':AOP',
        });
      }
      return AddMetadata<symbol | string, { metadata?: unknown; aopSymbol: symbol; originalFn: unknown }>(metadataKey, {
        originalFn: descriptor.value,
        metadata,
        aopSymbol,
      })(target, propertyKey, descriptor);
    },
    (_: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      const originalFn = descriptor.value;
      descriptor.value = function (this: any, ...args: any[]) {
        if (this[aopSymbol]?.[propertyKey]) {
          return this[aopSymbol][propertyKey].apply(this, args);
        }

        return originalFn.apply(this, args);
      };

      Object.defineProperty(descriptor.value, 'name', {
        value: propertyKey.toString(),
        writable: false,
      });
      Object.setPrototypeOf(descriptor.value, originalFn);
    }
  );
