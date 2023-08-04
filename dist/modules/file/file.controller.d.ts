import { DeleteFileDTO, UploadedFileDTO } from './dto';
import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    deleteAll(): Promise<void>;
    getAll(): Promise<import("./dto").S3ImageDTO[]>;
    uploadImage(file: Express.Multer.File): Promise<UploadedFileDTO>;
    uploadImages(files: Express.Multer.File[]): Promise<UploadedFileDTO[]>;
    deleteImage(body: DeleteFileDTO): Promise<void>;
}
