import { DateProps } from '@/common';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';
import { QnAAnswerDTO, QnAAnswerProps } from './qna-answer.dto';
export interface QnADTOProps extends DateProps {
    id: string;
    content: string;
    user: CommonUserProps;
    answers: QnAAnswerProps[];
    space: SpaceDTOProps;
}
export declare class QnADTO {
    id: string;
    content: string;
    user: CommonUserDTO;
    answers: QnAAnswerDTO[];
    createdAt: Date;
    updatedAt: Date;
    space: SpaceDTO;
    constructor(props: QnADTOProps);
}
