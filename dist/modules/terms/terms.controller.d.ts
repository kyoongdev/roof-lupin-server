import { TermDTO } from './dto';
import { TermsService } from './terms.service';
export declare class TermsController {
    private readonly termsService;
    constructor(termsService: TermsService);
    getTerms(): Promise<void>;
    getTerm(key: string): Promise<TermDTO>;
}
