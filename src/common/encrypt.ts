import { Injectable } from '@nestjs/common';

import crypto from 'crypto';

import { CommonException } from './exception/common.exception';
import { COMMON_ERROR_CODE, ENCRYPT_ERROR } from './exception/errorCode';

export class Encrypt {
  public static comparePassword(salt: string, password: string, hashedPassword: string) {
    try {
      return this.hashPassword(salt, password) === hashedPassword;
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(ENCRYPT_ERROR));
    }
  }

  public static hashPassword(salt: string, password: string) {
    try {
      return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(ENCRYPT_ERROR));
    }
  }

  public static createSalt() {
    try {
      return crypto.randomBytes(32).toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(ENCRYPT_ERROR));
    }
  }
}
