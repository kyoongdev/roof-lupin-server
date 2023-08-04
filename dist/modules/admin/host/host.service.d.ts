import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { HostDTO } from '@/modules/host/dto';
import { HostRepository } from '@/modules/host/host.repository';
export declare class AdminHostService {
    private readonly hostRepository;
    constructor(hostRepository: HostRepository);
    findPagingHosts(paging: PagingDTO, args?: Prisma.HostFindManyArgs): Promise<PaginationDTO<HostDTO>>;
    findHost(id: string): Promise<import("../../host/dto/host-detail.dto").HostDetailDTO>;
}
