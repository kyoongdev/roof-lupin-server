import { Property } from 'cumuco-nestjs';

export interface NaverMetaDTOProps {
  totalCount: number;
  page: number;
  count: number;
}

export class NaverMetaDTO {
  @Property({ apiProperty: { type: 'number', description: '검색된 총 결과 수' } })
  totalCount: number;

  @Property({ apiProperty: { type: 'number', description: 'page' } })
  page: number;

  @Property({ apiProperty: { type: 'number', description: '현재 페이지 개수' } })
  count: number;

  constructor(props: NaverMetaDTO) {
    this.totalCount = props.totalCount;
    this.page = props.page;
    this.count = props.count;
  }
}
