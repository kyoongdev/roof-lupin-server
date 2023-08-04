import { FrequentQuestionDTO } from './dto';
import { FrequentQuestionService } from './frequent-question.service';
export declare class FrequentQuestionController {
    private readonly frequentQuestionService;
    constructor(frequentQuestionService: FrequentQuestionService);
    getFrequentQuestion(id: string): Promise<FrequentQuestionDTO>;
    getFrequentQuestions(): Promise<FrequentQuestionDTO[]>;
}
