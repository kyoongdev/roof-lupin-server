export interface CreateAdditionalServiceDTOProps {
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
}
export declare class CreateAdditionalServiceDTO {
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
    constructor(props?: CreateAdditionalServiceDTOProps);
}
