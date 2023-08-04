import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
export interface ReviewReportDTOProps {
    id: string;
    content: string;
    isProcessed: boolean;
    createdAt: Date;
    user: CommonUserProps;
}
export declare class ReviewReportDTO {
    id: string;
    content: string;
    isProcessed: boolean;
    createdAt: Date;
    user: CommonUserDTO;
    constructor(props: ReviewReportDTOProps);
}
