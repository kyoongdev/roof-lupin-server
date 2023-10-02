import { Injectable } from '@nestjs/common';

import crypto from 'crypto';

import { CommonException } from './exception/common.exception';
import { COMMON_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class EncryptProvider {
  public comparePassword(salt: string, password: string, hashedPassword: string) {
    try {
      return this.hashPassword(salt, password) === hashedPassword;
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }

  public hashPassword(salt: string, password: string) {
    try {
      return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }

  public createSalt() {
    try {
      return crypto.randomBytes(32).toString('base64');
    } catch (err) {
      throw new CommonException(COMMON_ERROR_CODE.ENCRYPT_ERROR);
    }
  }
}
