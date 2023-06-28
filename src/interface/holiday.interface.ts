export interface Holiday {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
}
export interface Header {
  resultCode: string;
  resultMsg: string;
}

export interface Body<T> {
  items: {
    item?: T[] | T;
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface Response<T> {
  header: Header;
  body: Body<T>;
}

export interface OpenAPI<T = Holiday> {
  response: Response<T>;
}
