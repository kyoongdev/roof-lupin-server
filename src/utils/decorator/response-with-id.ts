export const RESPONSE_WITH_ID = Symbol('RESPONSE_WITH_ID');
export const ReflectTarget = {
  Controller: 'Controller',
};

export function ResponseWithId(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
  Reflect.defineMetadata(RESPONSE_WITH_ID, 'class', descriptor.value);
  return descriptor;
}
