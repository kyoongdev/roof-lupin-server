import { HomeContentsDTO, HomeContentsDTOProps } from '@/modules/home/dto';
export interface AdminHomeContentDTOProps extends HomeContentsDTOProps {
    orderNo: number;
}
export declare class AdminHomeContentDTO extends HomeContentsDTO {
    orderNo: number;
    constructor(props: AdminHomeContentDTOProps);
}
