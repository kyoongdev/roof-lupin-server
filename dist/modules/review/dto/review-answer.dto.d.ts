import { HostDTO, HostDTOProps } from '@/modules/host/dto';
export interface ReviewAnswerDTOProps {
    id: string;
    content: string;
    createdAt: Date;
    host: HostDTOProps;
}
export declare class ReviewAnswerDTO {
    id: string;
    content: string;
    createdAt: Date;
    host: HostDTO;
    constructor(props: ReviewAnswerDTOProps);
}
