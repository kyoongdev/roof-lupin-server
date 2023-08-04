import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class ReservationException extends HttpException {
    constructor(error: BaseErrorCode);
}
