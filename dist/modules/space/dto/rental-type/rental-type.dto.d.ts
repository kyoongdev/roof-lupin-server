import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '../additional-service';
import { TimeCostInfoDTOProps } from '../timeCostInfo';
export interface RentalTypeDTOProps {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    day: number;
    baseHour?: number;
    startAt?: number;
    endAt?: number;
    spaceId: string;
    timeCostInfo?: TimeCostInfoDTOProps[];
    additionalServices: AdditionalServiceDTOProps[];
}
export declare class RentalTypeDTO {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    day: number;
    baseHour?: number;
    startAt: number;
    endAt: number;
    timeCostInfos?: TimeCostInfoDTOProps[];
    spaceId: string;
    additionalServices: AdditionalServiceDTO[];
    constructor(props: RentalTypeDTOProps);
}
