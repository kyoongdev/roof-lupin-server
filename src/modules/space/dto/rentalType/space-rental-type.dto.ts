import { Property } from 'wemacu-nestjs';

import { PackageRentalTypeDTO, PackageRentalTypeDTOProps } from './package-rental-type.dto';
import { RentalTypeDTOProps } from './rental-type.dto';
import { TimeRentalTypeDTO, TimeRentalTypeDTOProps } from './time-rental-type.dto';

export type SpaceRentalTypeDTOProps = RentalTypeDTOProps[];

export class SpaceRentalTypeDTO {
  @Property({ apiProperty: { type: TimeRentalTypeDTO, description: '시간 대여타입' } })
  timeRentalType: TimeRentalTypeDTOProps;

  @Property({ apiProperty: { type: PackageRentalTypeDTO, description: '패키지 대여타입' } })
  packageRentalType: PackageRentalTypeDTO;

  constructor(props: SpaceRentalTypeDTOProps) {
    const timeRentalType: RentalTypeDTOProps | undefined = props.find((rentalType) => rentalType.rentalType === 1);
    const packageRentalType = props.filter((rentalType) => rentalType.rentalType === 2);

    this.timeRentalType = new TimeRentalTypeDTO(timeRentalType);
    this.packageRentalType = new PackageRentalTypeDTO(packageRentalType);
  }
}
