import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from 'cumuco-nestjs';
export declare class RankingException extends HttpException {
    constructor(error: BaseErrorCode);
}
