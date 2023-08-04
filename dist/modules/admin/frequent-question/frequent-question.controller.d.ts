import { CreateFrequentQuestionDTO, FrequentQuestionDTO, UpdateFrequentQuestionDTO } from '@/modules/frequent-question/dto';
import { AdminFrequentQuestionService } from './frequent-question.service';
export declare class AdminFrequentlyQuestionController {
    private readonly frequentQuestionService;
    constructor(frequentQuestionService: AdminFrequentQuestionService);
    getFrequentQuestion(id: string): Promise<FrequentQuestionDTO>;
    getFrequentQuestions(): Promise<FrequentQuestionDTO[]>;
    createFrequentQuestion(body: CreateFrequentQuestionDTO): Promise<string>;
    updateFrequentQuestion(id: string, body: UpdateFrequentQuestionDTO): Promise<void>;
    deleteFrequentQuestion(id: string): Promise<void>;
}
