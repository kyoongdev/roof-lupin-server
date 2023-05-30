import { Injectable } from '@nestjs/common';

import crypto from 'crypto';

export class Encrypt {
  public static comparePassword(salt: string, password: string, hashedPassword: string) {
    return this.hashPassword(salt, password) === hashedPassword;
  }

  public static hashPassword(salt: string, password: string) {
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
  }

  public static createSalt() {
    return crypto.randomBytes(32).toString('base64');
  }
}
