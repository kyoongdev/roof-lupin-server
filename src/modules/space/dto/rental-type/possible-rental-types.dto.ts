import { Property } from 'cumuco-nestjs';

import { PossiblePackageDTO, PossiblePackageDTOProps } from './possible-package.dto';
import { PossibleRentalTypeDTO, PossibleRentalTypeDTOProps } from './possible-rental-type.dto';

export interface PossibleRentalTypesDTOProps {
  time?: PossibleRentalTypeDTOProps | null;
  package: PossiblePackageDTOProps[];
}

export class PossibleRentalTypesDTO {
  @Property({ apiProperty: { type: PossibleRentalTypeDTO, nullable: true, description: '시간대여타입' } })
  time: PossibleRentalTypeDTO | null;

  @Property({ apiProperty: { type: PossiblePackageDTO, isArray: true, description: '패키지대여타입' } })
  package: PossiblePackageDTO[];

  constructor(props: PossibleRentalTypesDTOProps) {
    this.time = props.time ? new PossibleRentalTypeDTO(props.time) : null;
    this.package = props.package.map((pkg) => new PossiblePackageDTO(pkg));
  }
}
