import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class QnAException extends HttpException {
    constructor(error: BaseErrorCode);
}
