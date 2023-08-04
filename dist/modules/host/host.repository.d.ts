import type { Prisma } from '@prisma/client';
import { EncryptProvider } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';
import { CreateHostAccountDTO, CreateHostDTO, HostAccountDTO, HostDTO, UpdateHostAccountDTO, UpdateHostDTO } from './dto';
import { HostAuthDetailDTO } from './dto/host-auth-detail.dto';
import { HostDetailDTO } from './dto/host-detail.dto';
export declare class HostRepository {
    private readonly database;
    private readonly encrypt;
    constructor(database: PrismaService, encrypt: EncryptProvider);
    findHostBySpaceId(spaceId: string): Promise<HostDTO>;
    findHosts(args?: Prisma.HostFindManyArgs): Promise<HostDTO[]>;
    countHosts(args?: Prisma.HostCountArgs): Promise<number>;
    findHost(id: string): Promise<HostDTO>;
    findHostDetail(id: string): Promise<HostDetailDTO>;
    checkHostByEmail(email: string): Promise<false | HostDTO>;
    findHostByEmail(email: string): Promise<HostAuthDetailDTO>;
    createHost(data: CreateHostDTO): Promise<string>;
    updateHost(id: string, data: UpdateHostDTO): Promise<string>;
    deleteHost(id: string): Promise<void>;
    hardDeleteHost(id: string): Promise<void>;
    findHostAccount(id: string): Promise<HostAccountDTO>;
    findHostAccountByHostId(hostId: string): Promise<HostAccountDTO>;
    createHostAccount(hostId: string, data: CreateHostAccountDTO): Promise<string>;
    updateHostAccount(id: string, data: UpdateHostAccountDTO): Promise<string>;
    updateHostAccountByHostId(hostId: string, data: UpdateHostAccountDTO): Promise<void>;
    deleteHostAccount(id: string): Promise<void>;
}
