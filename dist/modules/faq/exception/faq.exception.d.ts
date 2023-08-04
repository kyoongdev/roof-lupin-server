import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class FAQException extends HttpException {
    constructor(error: BaseErrorCode);
}
