import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { CreateFAQDTO, FAQDTO } from './dto';
import { UserUpdateFAQDTO } from './dto/user-update-faq.dto';
import { FaqRepository } from './faq.repository';
export declare class FaqService {
    private readonly FaqRepository;
    constructor(FaqRepository: FaqRepository);
    findFAQ(id: string): Promise<FAQDTO>;
    findPagingFAQ(paging: PagingDTO, args?: Prisma.FAQFindManyArgs): Promise<PaginationDTO<FAQDTO>>;
    createFAQ(userId: string, data: CreateFAQDTO): Promise<string>;
    updateFAQ(id: string, userId: string, data: UserUpdateFAQDTO): Promise<void>;
    deleteFAQ(id: string, userId: string): Promise<void>;
}
