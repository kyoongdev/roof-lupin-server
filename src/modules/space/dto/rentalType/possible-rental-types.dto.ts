import { Property } from 'wemacu-nestjs';

import { PossiblePackageDTO, PossiblePackageDTOProps } from './possible-package.dto';
import { PossibleRentalTypeDTO, PossibleRentalTypeDTOProps } from './possible-rental-type.dto';

export interface PossibleRentalTypesDTOProps {
  time: PossibleRentalTypeDTOProps[];
  package: PossiblePackageDTOProps[];
}

export class PossibleRentalTypesDTO {
  @Property({ apiProperty: { type: PossibleRentalTypeDTO, isArray: true, description: '시간대여타입' } })
  time: PossibleRentalTypeDTO[];

  @Property({ apiProperty: { type: PossiblePackageDTO, isArray: true, description: '패키지대여타입' } })
  package: PossiblePackageDTO[];

  constructor(props: PossibleRentalTypesDTOProps) {
    this.time = props.time.map((time) => new PossibleRentalTypeDTO(time));
    this.package = props.package.map((pkg) => new PossiblePackageDTO(pkg));
  }
}
