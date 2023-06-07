import { PackageRentalTypeDTOProps } from './package-rental-type.dto';
import { TimeRentalTypeDTOProps } from './time-rental-type.dto';

export interface SpaceRentalTypeDTOProps {
  time: TimeRentalTypeDTOProps;
  packeges: PackageRentalTypeDTOProps[];
}

export class SpaceRentalTypeDTO {}
