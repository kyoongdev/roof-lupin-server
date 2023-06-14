import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { applyDecorators } from '@nestjs/common';

interface CacheApiOptions {
  ttl?: number;
  key?: string;
}

export const CacheApi = ({ ttl = 1000 * 60 * 10, key = 'DEFAULT_KEY' }: CacheApiOptions) =>
  applyDecorators(CacheKey(key), CacheTTL(ttl));
