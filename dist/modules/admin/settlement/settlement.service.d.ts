import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateSettlementDTO, SettlementDTO, UpdateSettlementDTO } from '@/modules/host/dto/settlement';
import { SettlementRepository } from '@/modules/host/settlement/settlement.repository';
import { ReservationRepository } from '@/modules/reservation/reservation.repository';
export declare class AdminSettlementService {
    private readonly settlementRepository;
    private readonly reservationRepository;
    constructor(settlementRepository: SettlementRepository, reservationRepository: ReservationRepository);
    findSettlement(id: string): Promise<import("@/modules/host/dto/settlement").SettlementDetailDTO>;
    findPagingSettlements(paging: PagingDTO, args?: Prisma.SettlementFindManyArgs): Promise<PaginationDTO<SettlementDTO>>;
    createSettlement(data: CreateSettlementDTO): Promise<string>;
    updateSettlement(id: string, data: UpdateSettlementDTO): Promise<void>;
    deleteSettlement(id: string): Promise<void>;
}
