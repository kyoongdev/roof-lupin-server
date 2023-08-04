import { DateDTO, type DateProps } from '@/common';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';
export interface ReportDTOProps extends DateProps {
    id: string;
    title: string;
    content: string;
    user: CommonUserProps;
    isAnswered: boolean;
}
export declare class ReportDTO extends DateDTO {
    id: string;
    title: string;
    content: string;
    user: CommonUserDTO;
    isAnswered: boolean;
    constructor(props: ReportDTOProps);
}
