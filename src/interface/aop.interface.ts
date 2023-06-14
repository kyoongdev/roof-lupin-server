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
