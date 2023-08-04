import { RentalTypeDTO, type RentalTypeDTOProps } from './rental-type.dto';
export type PackageRentalTypeDTOProps = RentalTypeDTOProps[];
export declare class PackageRentalTypeDTO {
    minPrice: number;
    maxPrice: number;
    rentalTypes: RentalTypeDTO[];
    constructor(props: PackageRentalTypeDTOProps);
}
