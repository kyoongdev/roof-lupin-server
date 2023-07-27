import { HttpException } from '@nestjs/common';

import type { BaseErrorCode } from 'cumuco-nestjs';

export class ReportException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
