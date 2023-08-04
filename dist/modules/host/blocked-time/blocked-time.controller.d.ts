import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';
import { FindBlockedTimesQuery } from '../dto/blocked-time/query';
import { BlockedTimeService } from './blocked-time.service';
export declare class BlockedTimeController {
    private readonly blockedTimeService;
    constructor(blockedTimeService: BlockedTimeService);
    getBlockedTime(id: string): Promise<BlockedTimeDTO>;
    getBlockedTimes(paging: PagingDTO, query: FindBlockedTimesQuery): Promise<import("cumuco-nestjs").PaginationDTO<BlockedTimeDTO>>;
    createBlockedTime(user: RequestHost, body: CreateBlockedTimeDTO): Promise<import(".prisma/client").BlockedTime>;
    updateBlockedTime(id: string, user: RequestHost, body: UpdateBlockedTimeDTO): Promise<void>;
    deleteBlockedTime(id: string, user: RequestHost): Promise<void>;
}
