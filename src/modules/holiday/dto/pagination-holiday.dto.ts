import { Property } from 'cumuco-nestjs';

import { HolidayPagingDTO, HolidayPagingDTOProps } from './holiday-paging.dto';
import { PagingHolidayDTO, PagingHolidayDTOProps } from './paging-holiday.dto';

export interface PaginationHolidayDTOProps {
  paging: HolidayPagingDTOProps;
  data: PagingHolidayDTOProps[];
}

export class PaginationHolidayDTO {
  @Property({ apiProperty: { type: HolidayPagingDTO, description: '페이징 정보' } })
  paging: HolidayPagingDTO;

  @Property({ apiProperty: { type: PagingHolidayDTO, isArray: true, description: '페이징 정보' } })
  data: PagingHolidayDTO[];

  constructor(props: PaginationHolidayDTOProps) {
    this.paging = props.paging;
    this.data = props.data.map((item) => new PagingHolidayDTO(item));
  }
}
