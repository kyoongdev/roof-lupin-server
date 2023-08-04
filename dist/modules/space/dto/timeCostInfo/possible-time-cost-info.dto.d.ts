import { TimeCostInfoDTO, TimeCostInfoDTOProps } from './time-cost-info.dto';
export interface PossibleTimeCostInfoDTOProps extends TimeCostInfoDTOProps {
    isPossible: boolean;
}
export declare class PossibleTimeCostInfoDTO extends TimeCostInfoDTO {
    isPossible: boolean;
    constructor(props: PossibleTimeCostInfoDTOProps);
}
