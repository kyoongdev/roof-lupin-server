import { HostDTO, HostDTOProps } from '@/modules/host/dto';
import { ReservationDTO, ReservationDTOProps } from '@/modules/reservation/dto';
import { SettlementDTO, SettlementDTOProps } from './settlement.dto';
export interface SettlementDetailDTOProps extends SettlementDTOProps {
    reservations: ReservationDTOProps[];
    host: HostDTOProps;
}
export declare class SettlementDetailDTO extends SettlementDTO {
    reservations: ReservationDTO[];
    host: HostDTO;
    constructor(props: SettlementDetailDTOProps);
}
