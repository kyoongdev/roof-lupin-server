import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class AdminException extends HttpException {
    constructor(error: BaseErrorCode);
}
