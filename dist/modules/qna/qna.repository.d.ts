import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateQnAAnswerDTO, CreateQnADTO, QnAAnswerDTO, QnADTO, UpdateQnAAnswerDTO, UpdateQnADTO } from './dto';
export declare class QnARepository {
    private readonly database;
    constructor(database: PrismaService);
    findQnAs(args?: Prisma.SpaceQnAFindManyArgs): Promise<QnADTO[]>;
    countQna(args?: Prisma.SpaceQnACountArgs): Promise<number>;
    findQnA(id: string): Promise<QnADTO>;
    createQnA(userId: string, data: CreateQnADTO): Promise<string>;
    updateQnA(id: string, data: UpdateQnADTO): Promise<void>;
    deleteQnA(id: string): Promise<void>;
    findQnAAnswer(id: string): Promise<QnAAnswerDTO>;
    createQnAAnswer(hostId: string, data: CreateQnAAnswerDTO): Promise<string>;
    updateQnAAnswer(id: string, data: UpdateQnAAnswerDTO): Promise<void>;
    deleteQnAAnswer(id: string): Promise<void>;
    hardDeleteQnAAnswer(id: string): Promise<void>;
}
