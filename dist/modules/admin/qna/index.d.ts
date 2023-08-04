import { PagingDTO } from 'cumuco-nestjs';
import { QnADTO } from '@/modules/qna/dto';
import { AdminQnAService } from './qna.service';
export declare class AdminQnAController {
    private readonly adminQnAService;
    constructor(adminQnAService: AdminQnAService);
    findQnA(qnaId: string): Promise<QnADTO>;
    findPagingQnAs(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<QnADTO>>;
    deleteQnA(qnaId: string): Promise<void>;
    deleteQnAAnswer(qnaAnswerId: string): Promise<void>;
    hardDeleteQnAAnswer(qnaAnswerId: string): Promise<void>;
}
