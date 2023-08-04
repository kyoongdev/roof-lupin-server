import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from './dto';
export declare class AnnouncementService {
    private readonly database;
    constructor(database: PrismaService);
    findAnnouncement(id: string): Promise<AnnouncementDTO>;
    findPagingAnnouncements(paging: PagingDTO, args?: Prisma.AnnouncementFindManyArgs): Promise<PaginationDTO<AnnouncementDTO>>;
    findAnnouncements(args?: Prisma.AnnouncementFindManyArgs): Promise<AnnouncementDTO[]>;
    countAnnouncements(args?: Prisma.AnnouncementCountArgs): Promise<number>;
    createAnnouncement(data: CreateAnnouncementDTO): Promise<string>;
    updateAnnouncement(id: string, data: UpdateAnnouncementDTO): Promise<void>;
    deleteAnnouncement(id: string): Promise<void>;
}
