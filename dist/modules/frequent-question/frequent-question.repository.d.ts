import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateFrequentQuestionDTO, FrequentQuestionDTO, UpdateFrequentQuestionDTO } from './dto';
export declare class FrequentQuestionRepository {
    private readonly database;
    constructor(database: PrismaService);
    findFrequentQuestion(id: string): Promise<FrequentQuestionDTO>;
    countFrequentQuestions(args?: Prisma.FrequentQuestionCountArgs): Promise<number>;
    findFrequentQuestions(args?: Prisma.FrequentQuestionFindManyArgs): Promise<FrequentQuestionDTO[]>;
    createFrequentQuestion(data: CreateFrequentQuestionDTO): Promise<string>;
    updateFrequentQuestion(id: string, data: UpdateFrequentQuestionDTO): Promise<void>;
    deleteFrequentQuestion(id: string): Promise<void>;
}
