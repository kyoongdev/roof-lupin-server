import { CreateReservationRentalTypeDTO, CreateReservationRentalTypeDTOProps } from './create-reservation-rental-type.dto';
export interface CreatePaymentDTOProps {
    year: string;
    month: string;
    day: string;
    userName: string;
    userPhoneNumber: string;
    totalCost: number;
    userCount: number;
    discountCost: number;
    originalCost: number;
    rentalTypes: CreateReservationRentalTypeDTOProps[];
    spaceId: string;
    userCouponIds?: string[];
    reservationId?: string;
}
export declare class CreatePaymentDTO {
    year: string;
    month: string;
    day: string;
    userName: string;
    userPhoneNumber: string;
    userCount: number;
    totalCost: number;
    discountCost: number;
    originalCost: number;
    rentalTypes: CreateReservationRentalTypeDTO[];
    spaceId: string;
    userCouponIds?: string[];
    reservationId?: string;
    constructor(props?: CreatePaymentDTOProps);
    validateProperties(target: Partial<CreatePaymentDTO>): void;
}
