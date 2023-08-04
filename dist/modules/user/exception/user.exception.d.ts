import { HttpException } from '@nestjs/common';
import type { BaseErrorCode } from 'cumuco-nestjs';
export declare class UserException extends HttpException {
    constructor(error: BaseErrorCode);
}
