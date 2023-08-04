import { PagingDTO } from 'cumuco-nestjs';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDTO, CreateAnnouncementDTO, UpdateAnnouncementDTO } from './dto';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    getAnnouncement(id: string): Promise<AnnouncementDTO>;
    getAnnouncements(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<AnnouncementDTO>>;
    createAnnouncement(data: CreateAnnouncementDTO): Promise<string>;
    updateAnnouncement(id: string, data: UpdateAnnouncementDTO): Promise<void>;
    deleteAnnouncement(id: string): Promise<void>;
}
