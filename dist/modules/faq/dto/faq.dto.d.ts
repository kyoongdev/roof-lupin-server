import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
export interface FAQDTOProps {
    id: string;
    question: string;
    answer?: string;
    user?: CommonUserProps;
}
export declare class FAQDTO {
    id: string;
    question: string;
    answer?: string;
    user?: CommonUserDTO;
    constructor(props: FAQDTOProps);
}
