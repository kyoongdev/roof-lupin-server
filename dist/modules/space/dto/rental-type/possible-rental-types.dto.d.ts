import { PossiblePackageDTO, PossiblePackageDTOProps } from './possible-package.dto';
import { PossibleRentalTypeDTO, PossibleRentalTypeDTOProps } from './possible-rental-type.dto';
export interface PossibleRentalTypesDTOProps {
    time?: PossibleRentalTypeDTOProps | null;
    package: PossiblePackageDTOProps[];
}
export declare class PossibleRentalTypesDTO {
    time: PossibleRentalTypeDTO | null;
    package: PossiblePackageDTO[];
    constructor(props: PossibleRentalTypesDTOProps);
}
