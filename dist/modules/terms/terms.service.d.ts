import { FileService } from '../file/file.service';
import { TermDTO } from './dto';
export declare class TermsService {
    private readonly fileService;
    constructor(fileService: FileService);
    getTerms(): Promise<void>;
    getTerm(key: string): Promise<TermDTO>;
}
