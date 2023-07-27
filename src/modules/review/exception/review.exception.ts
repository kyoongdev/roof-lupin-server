import { HttpException, Injectable } from '@nestjs/common';

import type { BaseErrorCode } from 'cumuco-nestjs';

export class ReviewException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
