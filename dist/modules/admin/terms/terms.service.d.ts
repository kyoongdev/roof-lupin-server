import { ConfigService } from '@nestjs/config';
import { FileService } from '@/modules/file/file.service';
import { TermDTO } from '@/modules/terms/dto';
import { UpdateTermDTO } from '../dto/terms';
export declare class AdminTermsService {
    private readonly fileService;
    private readonly configService;
    constructor(fileService: FileService, configService: ConfigService);
    getTerms(): Promise<TermDTO[]>;
    getTerm(key: string): Promise<TermDTO>;
    updateTerm(name: string, data: UpdateTermDTO): Promise<import("../../file/dto").UploadedFileDTO>;
    deleteTerm(name: string): Promise<void>;
}
