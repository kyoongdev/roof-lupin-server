import { Property } from 'cumuco-nestjs';

import { RentalTypeDTO, type RentalTypeDTOProps } from './rental-type.dto';

export type PackageRentalTypeDTOProps = RentalTypeDTOProps[];

export class PackageRentalTypeDTO {
  @Property({ apiProperty: { type: 'number', description: '최소가격' } })
  minPrice: number;

  @Property({ apiProperty: { type: 'number', description: '최대가격' } })
  maxPrice: number;

  @Property({ apiProperty: { type: RentalTypeDTO, isArray: true, description: '상세 요금 (더보기) ' } })
  rentalTypes: RentalTypeDTO[];

  constructor(props: PackageRentalTypeDTOProps) {
    const rentalTypes = props.filter((rentalType) => rentalType.rentalType === 2);

    this.minPrice = Math.min(...rentalTypes.map((rentalType) => rentalType.baseCost));
    this.maxPrice = Math.max(...rentalTypes.map((rentalType) => rentalType.baseCost));
    this.rentalTypes = rentalTypes.map((rentalType) => new RentalTypeDTO(rentalType));
  }
}
