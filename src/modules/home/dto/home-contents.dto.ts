import { Property } from 'cumuco-nestjs';

import { ContentCategoryDTO, ContentCategoryDTOProps } from '@/modules/category/dto';
import { ExhibitionDTO, ExhibitionDTOProps } from '@/modules/exhibition/dto';
import { RankingDTO, RankingDTOProps } from '@/modules/ranking/dto';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface HomeContentsDTOProps {
  id: string;
  contentsCategory: ContentCategoryDTOProps;
  exhibition: ExhibitionDTOProps;
  ranking: RankingDTOProps;
}

export class HomeContentsDTO {
  @Property({ apiProperty: { type: 'string', description: '홈 컨텐츠 id' } })
  id: string;

  @Property({
    apiProperty: { type: 'string', description: '홈 컨텐츠 종류', example: 'CONTENTS | EXHIBITION | RANKING' },
  })
  type: string;

  @Property({ apiProperty: { type: ContentCategoryDTO, nullable: true, description: '컨텐츠' } })
  contentCategory?: ContentCategoryDTO;

  @Property({ apiProperty: { type: ExhibitionDTO, nullable: true, description: '기획전' } })
  exhibition?: ExhibitionDTO;

  @Property({ apiProperty: { type: RankingDTO, nullable: true, description: '랭킹' } })
  ranking?: RankingDTO;

  constructor(props: HomeContentsDTOProps) {
    this.id = props.id;
    this.type = this.getContentType(props);
    this.contentCategory = props.contentsCategory ? new ContentCategoryDTO(props.contentsCategory) : undefined;
    this.exhibition = props.exhibition ? new ExhibitionDTO(props.exhibition) : undefined;
    this.ranking = props.ranking ? new RankingDTO(props.ranking) : undefined;
  }

  getContentType(props: HomeContentsDTOProps) {
    if (props.contentsCategory) {
      return 'CONTENTS';
    } else if (props.exhibition) {
      return 'EXHIBITION';
    } else return 'RANKING';
  }
}
