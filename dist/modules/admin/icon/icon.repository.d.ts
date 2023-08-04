import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { IconDetailDTO, IconDTO, IconInUseDTO } from '../dto/icon';
import { CreateIconDTO } from '../dto/icon/create-icon.dto';
export declare class IconRepository {
    private readonly database;
    constructor(database: PrismaService);
    checkIconInUse(iconPath: string): Promise<IconInUseDTO>;
    findIcon(id: string): Promise<IconDetailDTO>;
    countIcons(args?: Prisma.IconCountArgs): Promise<number>;
    findIcons(args?: Prisma.IconFindManyArgs): Promise<IconDTO[]>;
    createIcon(url: string, data: CreateIconDTO): Promise<string>;
    deleteIcon(id: string): Promise<void>;
}
