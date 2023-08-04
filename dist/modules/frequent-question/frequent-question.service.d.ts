import { Prisma } from '@prisma/client';
import { FrequentQuestionRepository } from './frequent-question.repository';
export declare class FrequentQuestionService {
    private readonly frequentQuestionRepository;
    constructor(frequentQuestionRepository: FrequentQuestionRepository);
    findFrequentQuestion(id: string): Promise<import("./dto").FrequentQuestionDTO>;
    findFrequentQuestions(args?: Prisma.FrequentQuestionFindManyArgs): Promise<import("./dto").FrequentQuestionDTO[]>;
}
