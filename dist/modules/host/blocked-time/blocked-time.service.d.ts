import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { ReservationDTO } from '@/modules/reservation/dto';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { SpaceRepository } from '@/modules/space/space.repository';
import { BlockedTimeDTO, CreateBlockedTimeDTO, UpdateBlockedTimeDTO } from '../dto/blocked-time';
import { BlockedTimeRepository } from './blocked-time.repository';
export declare class BlockedTimeService {
    private readonly blockedTimeRepository;
    private readonly reservationRepository;
    private readonly spaceRepository;
    constructor(blockedTimeRepository: BlockedTimeRepository, reservationRepository: ReservationRepository, spaceRepository: SpaceRepository);
    findBlockedTime(id: string): Promise<BlockedTimeDTO>;
    findPagingBlockedTimes(paging: PagingDTO, args?: Prisma.BlockedTimeFindManyArgs): Promise<PaginationDTO<BlockedTimeDTO>>;
    createBlockedTime(hostId: string, data: CreateBlockedTimeDTO): Promise<import(".prisma/client").BlockedTime>;
    updateBlockedTime(id: string, hostId: string, data: UpdateBlockedTimeDTO): Promise<void>;
    deleteBlockedTime(id: string, hostId: string): Promise<void>;
    validateBlockTime(startAt: number, endAt: number, reservations: ReservationDTO[]): void;
}
