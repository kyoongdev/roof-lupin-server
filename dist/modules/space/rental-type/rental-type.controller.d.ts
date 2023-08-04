import { PossibleRentalTypeByMonthQuery, PossibleRentalTypeQuery } from '../dto/query';
import { PossibleRentalTypePagingDTO } from '../dto/query/possible-rental-type-paging.dto';
import { PossibleRentalTypesDTO, RentalTypeDTO, SpaceRentalTypeDTO } from '../dto/rental-type';
import { RentalTypeService } from './rental-type.service';
export declare class RentalTypeController {
    private readonly rentalTypeService;
    constructor(rentalTypeService: RentalTypeService);
    getSpaceRentalTypeDetail(spaceId: string): Promise<SpaceRentalTypeDTO>;
    getSpaceRentalTypes(spaceId: string): Promise<RentalTypeDTO[]>;
    getPossibleSpaceRentalTypes(spaceId: string, query: PossibleRentalTypeQuery): Promise<PossibleRentalTypesDTO>;
    getPossibleSpaceRentalTypesByMoth(spaceId: string, query: PossibleRentalTypeByMonthQuery): Promise<import("../dto/rental-type").PossibleRentalTypesByMonthDTOProps>;
    getPagingPossibleSpaceRentalTypesByMoth(spaceId: string, query: PossibleRentalTypePagingDTO): Promise<import("../dto/rental-type/pagination-possible-rental-types-by-month.dto").PaginationPossibleRentalTypesByMonthDTO>;
}
