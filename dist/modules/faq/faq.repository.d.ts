import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateFAQDTO, FAQDTO, UpdateFAQDTO } from '@/modules/faq/dto';
export declare class FaqRepository {
    private readonly database;
    constructor(database: PrismaService);
    findFAQ(id: string): Promise<FAQDTO>;
    countFAQs(args?: Prisma.FAQCountArgs): Promise<number>;
    findFAQs(args?: Prisma.FAQFindManyArgs): Promise<FAQDTO[]>;
    createFAQ(userId: string, data: CreateFAQDTO): Promise<string>;
    updateFAQ(id: string, data: UpdateFAQDTO): Promise<void>;
    deleteFAQ(id: string): Promise<void>;
}
