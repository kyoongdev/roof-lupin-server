import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class AnnouncementException extends HttpException {
    constructor(error: BaseErrorCode);
}
