import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class PaymentException extends HttpException {
    constructor(error: BaseErrorCode);
}
