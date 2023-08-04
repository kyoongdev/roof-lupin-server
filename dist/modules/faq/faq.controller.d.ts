import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { CreateFAQDTO, FAQDTO } from './dto';
import { FaqService } from './faq.service';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    findFAQs(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<FAQDTO>>;
    createFAQ(user: RequestUser, body: CreateFAQDTO): Promise<string>;
    updateFAQ(id: string, user: RequestUser, body: CreateFAQDTO): Promise<void>;
    deleteFAQ(id: string, user: RequestUser): Promise<void>;
}
