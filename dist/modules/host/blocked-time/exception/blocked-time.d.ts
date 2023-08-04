import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class BlockedTimeException extends HttpException {
    constructor(error: BaseErrorCode);
}
