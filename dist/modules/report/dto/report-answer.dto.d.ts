import { AdminDTO, AdminDTOProps } from '@/modules/admin/dto';
export interface ReportAnswerDTOProps {
    id: string;
    content: string;
    createdAt: Date;
    admin: AdminDTOProps;
}
export declare class ReportAnswerDTO {
    id: string;
    content: string;
    createdAt: Date;
    admin: AdminDTO;
    constructor(props: ReportAnswerDTOProps);
}
