import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

export const AOP_KEY = Symbol('AOP_KEY');

export const AOP = (metadataKey: string | symbol) => applyDecorators(SetMetadata(AOP_KEY, metadataKey), Injectable);
