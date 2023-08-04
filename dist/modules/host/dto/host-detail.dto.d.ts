import { HostAccountDTO, HostAccountDTOProps } from './host-account.dto';
import { HostDTO, type HostDTOProps } from './host.dto';
export interface HostDetailDTOProps extends HostDTOProps {
    hostAccount: HostAccountDTOProps;
}
export declare class HostDetailDTO extends HostDTO {
    account: HostAccountDTO;
    constructor(props: HostDetailDTOProps);
}
