import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from 'wemacu-nestjs';

export class CurationException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
