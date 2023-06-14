import { AOP } from '../aop';
import { createDecorator } from '../aop/utils';

export const FOO = Symbol('FOO');

type FooOptions = {
  options: string;
};
export const Foo = (options: FooOptions) => createDecorator(FOO, options);

@AOP(FOO)
export class FooDecorator {
  wrap({ method, metadata: options }: any) {
    return (arg1: string, arg2: number) => {
      const originResult = method(arg1, arg2);

      return originResult;
    };
  }
}
