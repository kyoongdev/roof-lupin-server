import { Property } from 'cumuco-nestjs';

export interface CreateHomeContentsDTOProps {
  contentCategoryId?: string;
  exhibitionId?: string;
  rankingId?: string;
}

export class CreateHomeContentsDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '컨텐츠 카테고리 id' } })
  contentCategoryId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } })
  exhibitionId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '랭킹 id' } })
  rankingId?: string;

  constructor(props?: CreateHomeContentsDTOProps) {
    if (props) {
      this.contentCategoryId = props.contentCategoryId;
      this.exhibitionId = props.exhibitionId;
      this.rankingId = props.rankingId;
    }
  }
}
