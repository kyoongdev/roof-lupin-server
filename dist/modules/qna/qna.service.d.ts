import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateQnADTO, QnADTO, UpdateQnADTO } from './dto';
import { QnARepository } from './qna.repository';
export declare class QnAService {
    private readonly qnaRepository;
    constructor(qnaRepository: QnARepository);
    findPagingQnAs(paging: PagingDTO, args?: Prisma.SpaceQnAFindManyArgs): Promise<PaginationDTO<QnADTO>>;
    findQnAs(args?: Prisma.SpaceQnAFindManyArgs): Promise<QnADTO[]>;
    createQnA(userId: string, data: CreateQnADTO): Promise<string>;
    updateQnA(qnaId: string, userId: string, data: UpdateQnADTO): Promise<void>;
    deleteQnA(qnaId: string, userId: string): Promise<void>;
    checkIsUserValid(qnaId: string, userId: string): Promise<void>;
}
