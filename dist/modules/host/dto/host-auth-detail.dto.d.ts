import { HostDTO, HostDTOProps } from './host.dto';
export interface HostAuthDetailDTOProps extends HostDTOProps {
    password: string;
    salt: string;
}
export declare class HostAuthDetailDTO extends HostDTO {
    password: string;
    salt: string;
    constructor(props: HostAuthDetailDTOProps);
}
