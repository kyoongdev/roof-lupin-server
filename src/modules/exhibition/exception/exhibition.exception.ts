import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from 'wemacu-nestjs';

export class ExhibitionException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
