import { SpaceLocation } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';
import { PrismaService } from '@/database/prisma.service';
import { FindByLocationQuery } from '../space/dto/query/find-by-location.query';
export declare class LocationRepository {
    private readonly database;
    constructor(database: PrismaService);
    getLocationsByDistance(paging: PagingDTO, query: FindByLocationQuery): Promise<SpaceLocation[]>;
}
