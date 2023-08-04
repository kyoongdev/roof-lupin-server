export interface CreateQnAAnswerProps {
    content: string;
    spaceQnAId: string;
}
export declare class CreateQnAAnswerDTO {
    content: string;
    qnaId: string;
    constructor(props?: CreateQnAAnswerDTO);
}
