import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class SearchException extends HttpException {
    constructor(error: BaseErrorCode);
}
