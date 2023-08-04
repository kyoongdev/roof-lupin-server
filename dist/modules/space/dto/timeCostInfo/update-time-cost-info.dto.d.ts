import { CreateTimeCostInfoDTO, CreateTimeCostInfoDTOProps } from './create-time-cost-info.dto';
export interface UpdateTimeCostInfoDTOProps extends CreateTimeCostInfoDTOProps {
    isPossible?: boolean;
}
export declare class UpdateTimeCostInfoDTO extends CreateTimeCostInfoDTO {
    isPossible?: boolean;
    constructor(props?: UpdateTimeCostInfoDTOProps);
}
