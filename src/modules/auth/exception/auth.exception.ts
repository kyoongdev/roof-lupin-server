import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from 'cumuco-nestjs';

export class AuthException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
