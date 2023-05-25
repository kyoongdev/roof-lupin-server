import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const API_PREFIX = '/api/v1' as const;

export const ApiController = (path: string, tag: string) =>
  applyDecorators(ApiTags(tag), Controller(`${API_PREFIX}/${path}`));
