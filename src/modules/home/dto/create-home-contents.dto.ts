import { Property } from 'wemacu-nestjs';

export interface CreateHomeContentsDTOProps {
  orderNo: number;
  contentCategoryId?: string;
  exhibitionId?: string;
  rankingId?: string;
}

export class CreateHomeContentsDTO {
  @Property({ apiProperty: { type: 'number', description: '홈 노출 순서' } })
  orderNo: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '컨텐츠 카테고리 id' } })
  contentCategoryId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } })
  exhibitionId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '랭킹 id' } })
  rankingId?: string;

  constructor(props?: CreateHomeContentsDTOProps) {
    if (props) {
      this.orderNo = props.orderNo;
      this.contentCategoryId = props.contentCategoryId;
      this.exhibitionId = props.exhibitionId;
      this.rankingId = props.rankingId;
    }
  }
}
