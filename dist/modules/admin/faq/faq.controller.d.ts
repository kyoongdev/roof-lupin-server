import { PagingDTO } from 'cumuco-nestjs';
import { FAQDTO } from '@/modules/faq/dto';
import { AdminUpdateFAQAnswerDTO } from '../dto/faq';
import { AdminFindFAQsQuery } from '../dto/query/faq';
import { AdminFaqService } from './faq.service';
export declare class AdminFaqController {
    private readonly faqService;
    constructor(faqService: AdminFaqService);
    findFAQ(id: string): Promise<FAQDTO>;
    findFAQs(paging: PagingDTO, query: AdminFindFAQsQuery): Promise<import("cumuco-nestjs").PaginationDTO<FAQDTO>>;
    updateFAQ(id: string, body: AdminUpdateFAQAnswerDTO): Promise<void>;
    deleteFAQ(id: string): Promise<void>;
}
