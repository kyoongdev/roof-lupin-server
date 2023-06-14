import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

const AOP_KEY = 'AOP_KEY' as const;

export const AOP = (metadataKey: string | symbol) => applyDecorators(SetMetadata(AOP_KEY, metadataKey), Injectable);
