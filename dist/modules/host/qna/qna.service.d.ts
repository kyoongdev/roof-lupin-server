import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { FCMEvent } from '@/event/fcm';
import { CreateQnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO } from '@/modules/qna/dto';
import { QnARepository } from '@/modules/qna/qna.repository';
export declare class HostQnAService {
    private readonly qnaRepository;
    private readonly fcmEvent;
    private readonly database;
    constructor(qnaRepository: QnARepository, fcmEvent: FCMEvent, database: PrismaService);
    findQnA(id: string): Promise<QnADTO>;
    findPagingQnAs(paging: PagingDTO, args?: Prisma.SpaceQnAFindManyArgs): Promise<PaginationDTO<QnADTO>>;
    findQnAAnswer(id: string): Promise<import("@/modules/qna/dto").QnAAnswerDTO>;
    createQnAAnswer(hostId: string, data: CreateQnAAnswerDTO): Promise<string>;
    updateQnAAnswer(qnaAnswerId: string, hostId: string, data: UpdateQnAAnswerDTO): Promise<void>;
    deleteQnAAnswer(qnaAnswerId: string, hostId: string): Promise<void>;
}
