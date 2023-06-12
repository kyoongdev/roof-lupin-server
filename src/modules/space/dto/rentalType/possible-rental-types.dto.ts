import { Property } from 'wemacu-nestjs';

import { PossibleRentalTypeDTO, PossibleRentalTypeDTOProps } from './possible-rental-type.dto';

export interface PossibleRentalTypesDTOProps {
  time: PossibleRentalTypeDTOProps[];
  package: PossibleRentalTypeDTOProps[];
}

export class PossibleRentalTypesDTO {
  @Property({ apiProperty: { type: PossibleRentalTypeDTO, isArray: true, description: '시간대여타입' } })
  time: PossibleRentalTypeDTO[];

  @Property({ apiProperty: { type: PossibleRentalTypeDTO, isArray: true, description: '패키지대여타입' } })
  package: PossibleRentalTypeDTO[];

  constructor(props: PossibleRentalTypesDTOProps) {
    this.time = props.time.map((time) => new PossibleRentalTypeDTO(time));
    this.package = props.package.map((pkg) => new PossibleRentalTypeDTO(pkg));
  }
}
