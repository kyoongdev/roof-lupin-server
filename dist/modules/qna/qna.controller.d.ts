import { PagingDTO } from 'cumuco-nestjs';
import { RequestUser } from '@/interface/role.interface';
import { CreateQnADTO, QnADTO } from './dto';
import { QnAService } from './qna.service';
export declare class QnAController {
    private readonly qnaService;
    constructor(qnaService: QnAService);
    getMyQnA(user: RequestUser): Promise<QnADTO[]>;
    getMyPagingQnA(paging: PagingDTO, user: RequestUser): Promise<import("cumuco-nestjs").PaginationDTO<QnADTO>>;
    getSpaceQnA(spaceId: string): Promise<QnADTO[]>;
    getPagingSpaceQnA(spaceId: string, paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<QnADTO>>;
    createSpaceQnA(user: RequestUser, data: CreateQnADTO): Promise<string>;
    updateSpaceQnA(qnaId: string, user: RequestUser, data: CreateQnADTO): Promise<void>;
    deleteSpaceQnA(qnaId: string, user: RequestUser): Promise<void>;
}
