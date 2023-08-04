import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class MainException extends HttpException {
    constructor(error: BaseErrorCode);
}
