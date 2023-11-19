import { Property } from 'cumuco-nestjs';

export interface DeleteHomeContentsDTOProps {
  contentCategoryId?: string;
  exhibitionId?: string;
  rankingId?: string;
}

export class DeleteHomeContentsDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '컨텐츠 카테고리 id' } })
  contentCategoryId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 id' } })
  exhibitionId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '랭킹 id' } })
  rankingId?: string;

  constructor(props?: DeleteHomeContentsDTOProps) {
    if (props) {
      this.contentCategoryId = props.contentCategoryId;
      this.exhibitionId = props.exhibitionId;
      this.rankingId = props.rankingId;
    }
  }
}
