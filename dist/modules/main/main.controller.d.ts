import { PagingDTO } from 'cumuco-nestjs';
import { CreateMainImageDTO, CreateSloganDTO, MainDTO, UpdateMainImageDTO, UpdateSloganDTO } from './dto';
import { MainService } from './main.service';
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    getMain(): Promise<MainDTO>;
    getPagingMainImages(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<import("./dto").MainImageDTO>>;
    getMainImages(): Promise<import("./dto").MainImageDTO[]>;
    createMainImage(body: CreateMainImageDTO): Promise<string>;
    updateMainImage(id: string, body: UpdateMainImageDTO): Promise<void>;
    deleteMainImage(id: string): Promise<void>;
    getPagingSlogans(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<import("./dto").SloganDTO>>;
    getSlogans(): Promise<import("./dto").SloganDTO[]>;
    createSlogan(body: CreateSloganDTO): Promise<string>;
    updateSlogan(id: string, body: UpdateSloganDTO): Promise<void>;
    deleteSlogan(id: string): Promise<void>;
}
