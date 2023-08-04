import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '../additional-service';
export interface PossiblePackageDTOProps {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    startAt?: number;
    endAt?: number;
    day: number;
    spaceId: string;
    isPossible: boolean;
    additionalServices: AdditionalServiceDTOProps[];
}
export declare class PossiblePackageDTO {
    id: string;
    name: string;
    baseCost: number;
    rentalType: number;
    baseHour?: number;
    day: number;
    startAt: number;
    endAt: number;
    isPossible: boolean;
    spaceId: string;
    additionalServices: AdditionalServiceDTO[];
    constructor(props: PossiblePackageDTOProps);
}
