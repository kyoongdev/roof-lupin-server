import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { FileService } from '@/modules/file/file.service';
import { IconDTO } from '../dto/icon';
import { IconRepository } from './icon.repository';
export declare class AdminIconService {
    private readonly iconRepository;
    private readonly fileService;
    constructor(iconRepository: IconRepository, fileService: FileService);
    findIcon(id: string): Promise<import("../dto/icon").IconDetailDTO>;
    findPagingIcons(paging: PagingDTO, args?: Prisma.IconFindManyArgs): Promise<PaginationDTO<IconDTO>>;
    createIcon(file: Express.Multer.File, name: string): Promise<string>;
    deleteIcon(id: string): Promise<void>;
}
