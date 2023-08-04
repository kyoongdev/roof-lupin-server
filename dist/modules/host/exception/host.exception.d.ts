import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class HostException extends HttpException {
    constructor(error: BaseErrorCode);
}
