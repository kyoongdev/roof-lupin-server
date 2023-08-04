import { Prisma } from '@prisma/client';
import { CreateFrequentQuestionDTO, UpdateFrequentQuestionDTO } from '@/modules/frequent-question/dto';
import { FrequentQuestionRepository } from '@/modules/frequent-question/frequent-question.repository';
export declare class AdminFrequentQuestionService {
    private readonly frequentQuestionRepository;
    constructor(frequentQuestionRepository: FrequentQuestionRepository);
    findFrequentQuestion(id: string): Promise<import("@/modules/frequent-question/dto").FrequentQuestionDTO>;
    findFrequentQuestions(args?: Prisma.FrequentQuestionFindManyArgs): Promise<import("@/modules/frequent-question/dto").FrequentQuestionDTO[]>;
    createFrequentQuestion(data: CreateFrequentQuestionDTO): Promise<string>;
    updateFrequentQuestion(id: string, data: UpdateFrequentQuestionDTO): Promise<void>;
    deleteFrequentQuestion(id: string): Promise<void>;
}
