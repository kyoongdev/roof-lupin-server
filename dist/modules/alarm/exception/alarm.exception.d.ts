import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class AlarmException extends HttpException {
    constructor(error: BaseErrorCode);
}
