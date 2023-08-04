import { UpdateAdditionalServiceDTO, UpdateAdditionalServiceDTOProps } from '../additional-service';
import { UpdateTimeCostInfoDTO, UpdateTimeCostInfoDTOProps } from '../timeCostInfo';
export interface UpdateRentalTypeDTOProps {
    name?: string;
    baseCost?: number;
    rentalType?: number;
    baseHour?: number;
    startAt?: number;
    endAt?: number;
    day?: number;
    timeCostInfos?: UpdateTimeCostInfoDTOProps[];
    additionalServices?: UpdateAdditionalServiceDTOProps[];
}
export declare class UpdateRentalTypeDTO {
    name?: string;
    baseCost?: number;
    rentalType?: number;
    baseHour?: number;
    startAt?: number;
    day?: number;
    endAt?: number;
    timeCostInfos?: UpdateTimeCostInfoDTO[];
    additionalServices: UpdateAdditionalServiceDTO[];
    constructor(props?: UpdateRentalTypeDTOProps);
}
