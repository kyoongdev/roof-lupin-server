import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class AppInfoException extends HttpException {
    constructor(error: BaseErrorCode);
}
