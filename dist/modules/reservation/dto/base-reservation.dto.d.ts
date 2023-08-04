export interface BaseReservationDTOProps {
    id: string;
    year: string;
    month: string;
    day: string;
    code: string;
    userCount: number;
    totalCost: number;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    isCanceled: boolean;
    payedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class BaseReservationDTO {
    id: string;
    year: string;
    month: string;
    day: string;
    code: string;
    totalCost: number;
    userCount: number;
    isCanceled: boolean;
    vatCost: number;
    discountCost: number;
    originalCost: number;
    createdAt: Date;
    updatedAt: Date;
    payedAt?: Date;
    constructor(props: BaseReservationDTOProps);
}
