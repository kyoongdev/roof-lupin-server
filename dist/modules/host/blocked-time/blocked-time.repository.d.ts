import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';
export declare class BlockedTimeRepository {
    private readonly database;
    constructor(database: PrismaService);
    findBlockedTime(id: string): Promise<BlockedTimeDTO>;
    countBlockedTimes(args?: Prisma.BlockedTimeCountArgs): Promise<number>;
    findBlockedTimes(args?: Prisma.BlockedTimeFindManyArgs): Promise<BlockedTimeDTO[]>;
    createBlockedTime(data: CreateBlockedTimeDTO): Promise<import(".prisma/client").BlockedTime>;
    updateBlockedTime(id: string, data: UpdateBlockedTimeDTO): Promise<void>;
    deleteBlockedTime(id: string): Promise<void>;
}
