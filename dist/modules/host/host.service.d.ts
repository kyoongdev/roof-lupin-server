import { EncryptProvider } from '@/common/encrypt';
import { CheckHostDTO, CreateHostAccountDTO, IsHostCheckedDTO, NewPasswordDTO, UpdateHostAccountDTO, UpdateHostDTO, UpdateHostPasswordDTO } from './dto';
import { HostRepository } from './host.repository';
export declare class HostService {
    private readonly hostRepository;
    private readonly encrypt;
    constructor(hostRepository: HostRepository, encrypt: EncryptProvider);
    findHostBySpaceId(spaceId: string): Promise<import("./dto").HostDTO>;
    findHost(id: string): Promise<import("./dto").HostDTO>;
    findHostDetail(id: string): Promise<import("./dto/host-detail.dto").HostDetailDTO>;
    findHostAccount(id: string): Promise<import("./dto").HostAccountDTO>;
    findHostAccountByHostId(hostId: string): Promise<import("./dto").HostAccountDTO>;
    checkHost(data: CheckHostDTO): Promise<IsHostCheckedDTO>;
    updateHostPassword(data: UpdateHostPasswordDTO): Promise<NewPasswordDTO>;
    updateHost(id: string, data: UpdateHostDTO): Promise<void>;
    deleteHost(id: string): Promise<void>;
    hardDeleteHost(id: string): Promise<void>;
    createHostAccount(hostId: string, data: CreateHostAccountDTO): Promise<string>;
    updateHostAccountByHostId(hostId: string, data: UpdateHostAccountDTO): Promise<void>;
    deleteHostAccountByHostId(hostId: string): Promise<void>;
}
