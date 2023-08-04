import { UpdateCurationDTO, UpdateCurationDTOProps } from '@/modules/curation/dto';
export interface AdminUpdateCurationDTOProps extends UpdateCurationDTOProps {
    orderNo?: number;
}
export declare class AdminUpdateCurationDTO extends UpdateCurationDTO {
    orderNo?: number;
    constructor(props?: AdminUpdateCurationDTOProps);
}
