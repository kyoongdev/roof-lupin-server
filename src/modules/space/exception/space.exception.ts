import { HttpException, Injectable } from '@nestjs/common';
import type { BaseErrorCode } from 'wemacu-nestjs';

export class SpaceException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
