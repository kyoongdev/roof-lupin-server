import { Property } from 'cumuco-nestjs';

import { RentalTypeDTO, RentalTypeDTOProps } from '@/modules/rental-type/dto';

export interface ValidatedPaymentDTOProps {
  rentalTypes: RentalTypeDTOProps[];
  totalCost: number;
  originalCost: number;
  discountCost: number;
  lupinDiscountCost: number;
}

export class ValidatedPaymentDTO {
  @Property({ apiProperty: { type: RentalTypeDTO, isArray: true, description: '렌탈 타입' } })
  rentalTypes: RentalTypeDTO[];

  @Property({ apiProperty: { type: 'number', description: '총 비용' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 전 비용' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 비용' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '루팡 할인 비용' } })
  lupinDiscountCost: number;

  constructor(props: ValidatedPaymentDTOProps) {
    this.rentalTypes = props.rentalTypes.map((reservation) => new RentalTypeDTO(reservation));
    this.totalCost = props.totalCost;
    this.originalCost = props.originalCost;
    this.discountCost = props.discountCost;
    this.lupinDiscountCost = props.lupinDiscountCost;
  }
}
