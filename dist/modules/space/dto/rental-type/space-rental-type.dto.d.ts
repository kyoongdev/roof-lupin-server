import { PackageRentalTypeDTO } from './package-rental-type.dto';
import { RentalTypeDTOProps } from './rental-type.dto';
import { TimeRentalTypeDTO } from './time-rental-type.dto';
export type SpaceRentalTypeDTOProps = RentalTypeDTOProps[];
export declare class SpaceRentalTypeDTO {
    timeRentalType: TimeRentalTypeDTO;
    packageRentalType: PackageRentalTypeDTO;
    constructor(props: SpaceRentalTypeDTOProps);
}
