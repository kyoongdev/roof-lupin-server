import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class FrequentQuestionException extends HttpException {
    constructor(error: BaseErrorCode);
}
