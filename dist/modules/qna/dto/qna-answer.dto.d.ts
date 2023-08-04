import { DateDTO, type DateProps } from '@/common';
import { HostDTO, type HostDTOProps } from '@/modules/host/dto/host.dto';
export interface QnAAnswerProps extends DateProps {
    id: string;
    content: string;
    spaceQnAId: string;
    host: HostDTOProps;
}
export declare class QnAAnswerDTO extends DateDTO {
    id: string;
    content: string;
    qnaId: string;
    host: HostDTO;
    constructor(props: QnAAnswerProps);
}
