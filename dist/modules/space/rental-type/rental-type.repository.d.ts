import { Prisma } from '@prisma/client';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { AdditionalServiceDTO } from '../dto/additional-service';
import { CreateRentalTypeDTO, RentalTypeDTO, RentalTypeWithReservationDTO, SpaceRentalTypeDTO, UpdateRentalTypeDTO } from '../dto/rental-type';
export declare class RentalTypeRepository {
    private readonly database;
    constructor(database: PrismaService);
    findRentalTypeAdditionalServices(id: string): Promise<AdditionalServiceDTO[]>;
    findRentalType(id: string): Promise<RentalTypeDTO>;
    findRentalTypes(args?: Prisma.RentalTypeFindManyArgs): Promise<RentalTypeDTO[]>;
    findRentalTypesWithReservations(args?: Prisma.RentalTypeFindManyArgs, reservationArgs?: Prisma.ReservationFindManyArgs): Promise<RentalTypeWithReservationDTO[]>;
    findRentalTypeWithReservations(id: string, reservationArgs?: Prisma.ReservationFindManyArgs): Promise<RentalTypeWithReservationDTO>;
    findSpaceRentalTypeDetail(spaceId: string): Promise<SpaceRentalTypeDTO>;
    createRentalTypes(prisma: TransactionPrisma, spaceId: string, data: CreateRentalTypeDTO[]): Promise<void>;
    updateRentalType(rentalTypeId: string, data: UpdateRentalTypeDTO): Promise<void>;
}
