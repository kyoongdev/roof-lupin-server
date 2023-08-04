import { PagingDTO } from 'cumuco-nestjs';
import { RequestHost } from '@/interface/role.interface';
import { CreateQnAAnswerDTO, QnADTO } from '@/modules/qna/dto';
import { HostQnAService } from './qna.service';
export declare class HostQnAController {
    private readonly qnaService;
    constructor(qnaService: HostQnAService);
    getQnA(qnaId: string): Promise<QnADTO>;
    getQnAsBySpaceID(paging: PagingDTO, spaceId: string, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<QnADTO>>;
    getQnAs(paging: PagingDTO, user: RequestHost): Promise<import("cumuco-nestjs").PaginationDTO<QnADTO>>;
    createQnAAnswer(user: RequestHost, body: CreateQnAAnswerDTO): Promise<string>;
    updateQnAAnswer(answerId: string, user: RequestHost, body: CreateQnAAnswerDTO): Promise<void>;
    deleteQnAAnswer(answerId: string, user: RequestHost): Promise<void>;
}
