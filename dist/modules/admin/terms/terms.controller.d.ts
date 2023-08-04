import { UploadedFileDTO } from '@/modules/file/dto';
import { TermDTO } from '@/modules/terms/dto';
import { UpdateTermDTO } from '../dto/terms';
import { AdminTermsService } from './terms.service';
export declare class AdminTermsController {
    private readonly termsService;
    constructor(termsService: AdminTermsService);
    getTerms(): Promise<TermDTO[]>;
    getTerm(key: string): Promise<TermDTO>;
    updateTerm(name: string, body: UpdateTermDTO): Promise<UploadedFileDTO>;
    deleteTerm(name: string): Promise<void>;
}
