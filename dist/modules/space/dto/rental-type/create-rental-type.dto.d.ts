import { CreateAdditionalServiceDTO, CreateAdditionalServiceDTOProps } from '../additional-service';
import { CreateTimeCostInfoDTO, CreateTimeCostInfoDTOProps } from '../timeCostInfo';
export interface CreateRentalTypeDTOProps {
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    startAt?: number;
    endAt?: number;
    day: number;
    timeCostInfos?: CreateTimeCostInfoDTOProps[];
    additionalServices: CreateAdditionalServiceDTOProps[];
}
export declare class CreateRentalTypeDTO {
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    day: number;
    startAt: number;
    endAt: number;
    timeCostInfos?: CreateTimeCostInfoDTO[];
    additionalServices: CreateAdditionalServiceDTO[];
    constructor(props?: CreateRentalTypeDTOProps);
}
