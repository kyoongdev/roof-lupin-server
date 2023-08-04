import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class CommonException extends HttpException {
    constructor(error: BaseErrorCode);
}
