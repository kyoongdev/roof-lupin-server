import { Controller } from '@nestjs/common';

const API_PREFIX = '/api/v1' as const;

export const ApiController = (path: string) => Controller(`${API_PREFIX}/${path}`);
