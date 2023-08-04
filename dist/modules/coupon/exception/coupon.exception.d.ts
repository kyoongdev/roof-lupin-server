import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class CouponException extends HttpException {
    constructor(error: BaseErrorCode);
}
