import { HttpException } from '@nestjs/common';

import type { BaseErrorCode } from 'wemacu-nestjs';

export class CategoryException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
