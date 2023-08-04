import { PagingDTO } from 'cumuco-nestjs';
import { HostDTO } from '@/modules/host/dto';
import { HostDetailDTO } from '@/modules/host/dto/host-detail.dto';
import { AdminHostService } from './host.service';
export declare class AdminHostController {
    private readonly hostService;
    constructor(hostService: AdminHostService);
    getHosts(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<HostDTO>>;
    getHostDetail(hostId: string): Promise<HostDetailDTO>;
}
