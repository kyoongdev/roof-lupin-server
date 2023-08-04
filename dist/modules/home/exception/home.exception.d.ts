import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class HomeException extends HttpException {
    constructor(error: BaseErrorCode);
}
