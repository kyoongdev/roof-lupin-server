import { MainImage, Prisma, Slogan } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { CreateMainImageDTO, CreateSloganDTO, MainDTO, MainImageDTO, SloganDTO, UpdateMainImageDTO, UpdateSloganDTO } from './dto';
export declare class MainService {
    private readonly database;
    constructor(database: PrismaService);
    findMain(): Promise<MainDTO>;
    findMainImage(id: string): Promise<MainImage>;
    findMainImages(args?: Prisma.MainImageFindManyArgs): Promise<MainImageDTO[]>;
    countMainImages(args?: Prisma.MainImageCountArgs): Promise<number>;
    findPagingMainImages(paging: PagingDTO, args?: Prisma.MainImageFindManyArgs): Promise<PaginationDTO<MainImageDTO>>;
    createMainImage(data: CreateMainImageDTO): Promise<string>;
    updateMainImage(id: string, data: UpdateMainImageDTO): Promise<void>;
    deleteMainImage(id: string): Promise<void>;
    findSlogan(id: string): Promise<Slogan>;
    findSlogans(args?: Prisma.SloganFindManyArgs): Promise<SloganDTO[]>;
    countSlogans(args?: Prisma.SloganCountArgs): Promise<number>;
    findPagingSlogans(paging: PagingDTO, args?: Prisma.SloganFindManyArgs): Promise<PaginationDTO<SloganDTO>>;
    createSlogan(data: CreateSloganDTO): Promise<string>;
    updateSlogan(id: string, data: UpdateSloganDTO): Promise<void>;
    deleteSlogan(id: string): Promise<void>;
    countDefaultMainImages(): Promise<number>;
    updateMainImageDefaultToFalse(): Prisma.PrismaPromise<Prisma.BatchPayload>;
    countDefaultSlogan(): Promise<number>;
    updateSloganDefaultToFalse(): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
