export interface UpdateAdditionalServiceDTOProps {
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
}
export declare class UpdateAdditionalServiceDTO {
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
    constructor(props?: UpdateAdditionalServiceDTOProps);
}
