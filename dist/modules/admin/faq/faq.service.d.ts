import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FAQDTO } from '@/modules/faq/dto';
import { FaqRepository } from '@/modules/faq/faq.repository';
import { AdminUpdateFAQAnswerDTO } from '../dto/faq';
export declare class AdminFaqService {
    private readonly FaqRepository;
    constructor(FaqRepository: FaqRepository);
    findFAQ(id: string): Promise<FAQDTO>;
    findPagingFAQ(paging: PagingDTO, args?: Prisma.FAQFindManyArgs): Promise<PaginationDTO<FAQDTO>>;
    updateAnswerFAQ(id: string, data: AdminUpdateFAQAnswerDTO): Promise<void>;
    deleteFAQ(id: string): Promise<void>;
}
