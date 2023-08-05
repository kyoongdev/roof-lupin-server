import { Property } from 'cumuco-nestjs';

import { PossibleRentalTypePagingDTOProps } from '@/modules/space/dto/query/possible-rental-type-paging.dto';

import { PossibleRentalTypePaginationDTO } from './possible-rental-type-pagination.dto';
import {
  PossibleRentalTypesByMonthDTO,
  PossibleRentalTypesByMonthDTOProps,
} from './possible-rental-types-by-month.dto';

export interface PaginationPossibleRentalTypesByMonthDTOProps {
  paging: PossibleRentalTypePagingDTOProps;
  data: PossibleRentalTypesByMonthDTOProps[];
}

export class PaginationPossibleRentalTypesByMonthDTO {
  @Property({ apiProperty: { type: PossibleRentalTypePaginationDTO, description: '페이징 정보' } })
  paging: PossibleRentalTypePaginationDTO;

  @Property({ apiProperty: { type: PossibleRentalTypesByMonthDTO, isArray: true, description: '페이징 정보' } })
  data: PossibleRentalTypesByMonthDTO[];

  constructor(props: PaginationPossibleRentalTypesByMonthDTOProps) {
    this.paging = new PossibleRentalTypePaginationDTO(props.paging);
    this.data = props.data.map((item) => new PossibleRentalTypesByMonthDTO(item));
  }
}
