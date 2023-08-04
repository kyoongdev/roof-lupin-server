export interface AdditionalServiceDTOProps {
    id: string;
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
}
export declare class AdditionalServiceDTO {
    id: string;
    name: string;
    cost: number;
    description?: string;
    tooltip?: string;
    maxCount?: number;
    constructor(props: AdditionalServiceDTOProps);
}
