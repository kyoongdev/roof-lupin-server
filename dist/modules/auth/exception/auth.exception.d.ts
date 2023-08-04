import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class AuthException extends HttpException {
    constructor(error: BaseErrorCode);
}
