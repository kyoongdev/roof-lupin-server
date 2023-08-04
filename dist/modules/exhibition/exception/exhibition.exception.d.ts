import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class ExhibitionException extends HttpException {
    constructor(error: BaseErrorCode);
}
