import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { QnADTO } from '@/modules/qna/dto';
import { QnARepository } from '@/modules/qna/qna.repository';
export declare class AdminQnAService {
    private readonly qnaRepository;
    constructor(qnaRepository: QnARepository);
    findQnA(qnaId: string): Promise<QnADTO>;
    findPagingQnAs(paging: PagingDTO, args?: Prisma.SpaceQnAFindManyArgs): Promise<PaginationDTO<QnADTO>>;
    deleteQnA(qnaId: string): Promise<void>;
    deleteQnAAnswer(qnaAnswerId: string): Promise<void>;
    hardDeleteQnAAnswer(qnaAnswerId: string): Promise<void>;
}
