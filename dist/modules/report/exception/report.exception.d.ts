import { HttpException } from '@nestjs/common';
import type { BaseErrorCode } from 'cumuco-nestjs';
export declare class ReportException extends HttpException {
    constructor(error: BaseErrorCode);
}
