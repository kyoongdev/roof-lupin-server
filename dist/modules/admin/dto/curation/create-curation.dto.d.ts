import { CreateCurationDTO, CreateCurationDTOProps } from '@/modules/curation/dto';
export interface AdminCreateCurationDTOProps extends CreateCurationDTOProps {
    orderNo?: number;
}
export declare class AdminCreateCurationDTO extends CreateCurationDTO {
    orderNo?: number;
    constructor(props?: AdminCreateCurationDTOProps);
}
