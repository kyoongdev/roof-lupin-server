import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class CurationException extends HttpException {
    constructor(error: BaseErrorCode);
}
