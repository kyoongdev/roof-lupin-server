import { PagingDTO } from 'cumuco-nestjs';
import { IconDetailDTO, IconDTO } from '../dto/icon';
import { CreateIconDTO } from '../dto/icon/create-icon.dto';
import { AdminIconService } from './icon.service';
export declare class AdminIconController {
    private readonly iconService;
    constructor(iconService: AdminIconService);
    getIcon(id: string): Promise<IconDetailDTO>;
    getIcons(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<IconDTO>>;
    createIcon(file: Express.Multer.File, body: CreateIconDTO): Promise<string>;
    deleteIcon(id: string): Promise<void>;
}
