import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '../additional-service';
import { PossibleTimeCostInfoDTO, type PossibleTimeCostInfoDTOProps } from '../timeCostInfo/possible-time-cost-info.dto';
export interface PossibleRentalTypeDTOProps {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    startAt?: number;
    endAt?: number;
    day: number;
    spaceId?: string;
    timeCostInfos?: PossibleTimeCostInfoDTOProps[];
    additionalServices: AdditionalServiceDTOProps[];
}
export declare class PossibleRentalTypeDTO {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    startAt: number;
    endAt: number;
    day: number;
    spaceId: string;
    timeCostInfos?: PossibleTimeCostInfoDTO[];
    additionalServices: AdditionalServiceDTO[];
    constructor(props: PossibleRentalTypeDTOProps);
}
