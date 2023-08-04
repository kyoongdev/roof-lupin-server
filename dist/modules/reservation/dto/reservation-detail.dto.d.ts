import { CommonReservation } from '@/interface/reservation.interface';
import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';
export interface ReservationDetailDTOProps extends ReservationDTOProps {
    orderId?: string;
    orderResultId?: string;
    payMethod?: number;
    refundCost?: number;
    isApproved: boolean;
    approvedAt?: Date;
}
export declare class ReservationDetailDTO extends ReservationDTO {
    orderId?: string;
    orderResultId?: string;
    payMethod?: number;
    refundCost?: number;
    isApproved: boolean;
    approvedAt?: Date;
    constructor(props: ReservationDetailDTOProps);
    static generateReservationDetailDTO(reservation: CommonReservation): ReservationDetailDTOProps;
}
