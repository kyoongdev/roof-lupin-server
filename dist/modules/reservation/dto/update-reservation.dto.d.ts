export interface UpdateReservationDTOProps {
    year?: string;
    month?: string;
    day?: string;
    userName?: string;
    userPhoneNumber?: string;
    startAt?: number;
    endAt?: number;
    totalCost?: number;
    discountCost?: number;
    originalCost?: number;
    isApproved?: boolean;
    isCanceled?: boolean;
}
export declare class UpdateReservationDTO {
    year?: string;
    month?: string;
    day?: string;
    userName?: string;
    userPhoneNumber?: string;
    startAt?: number;
    endAt?: number;
    totalCost?: number;
    discountCost?: number;
    originalCost?: number;
    isApproved?: boolean;
    isCanceled?: boolean;
    constructor(props?: UpdateReservationDTOProps);
}
