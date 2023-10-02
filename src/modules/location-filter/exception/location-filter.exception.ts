import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from 'cumuco-nestjs';

export class LocationFilterException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
