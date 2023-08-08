import { Property } from 'cumuco-nestjs';

import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/rental-type/dto';

export interface ValidatedRentalTypeDTOProps {
  rentalTypes: RentalTypeDTOProps[];
  cost: number;
}

export class ValidatedRentalTypeDTO {
  @Property({ apiProperty: { type: RentalTypeDTO, isArray: true, description: '렌탈 타입' } })
  rentalTypes: RentalTypeDTO[];

  @Property({ apiProperty: { type: Number, description: '총 비용' } })
  cost: number;

  constructor(props: ValidatedRentalTypeDTOProps) {
    this.rentalTypes = props.rentalTypes.map((rentalType) => new RentalTypeDTO(rentalType));
    this.cost = props.cost;
  }

  increaseCost(cost: number) {
    this.cost += cost;
  }

  appendRentalType(rentalType: RentalTypeDTO) {
    this.rentalTypes.push(rentalType);
  }
}
