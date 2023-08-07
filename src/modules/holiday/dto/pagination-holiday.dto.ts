import { Property } from 'cumuco-nestjs';

import { HolidayPagingDTO } from './holiday-paging.dto';
import { PagingHolidayDTO, PagingHolidayDTOProps } from './paging-holiday.dto';
import { HolidayPagingQueryProps } from './query';

export interface PaginationHolidayDTOProps {
  paging: HolidayPagingQueryProps;
  data: PagingHolidayDTOProps[];
}

export class PaginationHolidayDTO {
  @Property({ apiProperty: { type: HolidayPagingDTO, description: '페이징 정보' } })
  paging: HolidayPagingDTO;

  @Property({ apiProperty: { type: PagingHolidayDTO, isArray: true, description: '페이징 정보' } })
  data: PagingHolidayDTO[];

  constructor(props: PaginationHolidayDTOProps) {
    this.paging = new HolidayPagingDTO(props.paging);
    this.data = props.data.map((item) => new PagingHolidayDTO(item));
  }
}
