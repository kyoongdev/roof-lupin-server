import { RequestHost } from '@/interface/role.interface';
import { CheckHostDTO, CreateHostAccountDTO, HostAccountDTO, HostDTO, IsHostCheckedDTO, NewPasswordDTO, UpdateHostAccountDTO, UpdateHostDTO, UpdateHostPasswordDTO } from './dto';
import { HostDetailDTO } from './dto/host-detail.dto';
import { HostService } from './host.service';
export declare class HostController {
    private readonly hostService;
    constructor(hostService: HostService);
    getHostBySpaceId(id: string): Promise<HostDTO>;
    getMe(user: RequestHost): Promise<HostDTO>;
    getMeDetail(user: RequestHost): Promise<HostDetailDTO>;
    checkHost(body: CheckHostDTO): Promise<IsHostCheckedDTO>;
    getMyAccount(user: RequestHost): Promise<HostAccountDTO>;
    updatePassword(body: UpdateHostPasswordDTO): Promise<NewPasswordDTO>;
    updateMe(user: RequestHost, body: UpdateHostDTO): Promise<void>;
    deleteMe(user: RequestHost): Promise<void>;
    createAccount(user: RequestHost, body: CreateHostAccountDTO): Promise<string>;
    updateAccount(user: RequestHost, body: UpdateHostAccountDTO): Promise<void>;
    deleteAccount(user: RequestHost): Promise<void>;
}
