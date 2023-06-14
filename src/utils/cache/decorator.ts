import { applyDecorators, SetMetadata } from '@nestjs/common';
export const CACHE_DECORATOR = 'CACHE_DECORATOR' as const;

export const CacheDecoratorTest = (): MethodDecorator => applyDecorators(SetMetadata(CACHE_DECORATOR, 'TEST'));
