import { TimeCostInfoDTOProps } from '../timeCostInfo';
export interface TimeRentalTypeDTOProps {
    id: string;
    name: string;
    timeCostInfos?: TimeCostInfoDTOProps[];
}
export declare class TimeRentalTypeDTO {
    id: string;
    name: string;
    minCost: number;
    maxCost: number;
    constructor(props: TimeRentalTypeDTOProps);
}
