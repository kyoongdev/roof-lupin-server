import { Property } from 'wemacu-nestjs';

import { ContentCategoryDTO, ContentCategoryDTOProps } from '@/modules/category/dto';
import { ExhibitionDTO, ExhibitionDTOProps } from '@/modules/exhibition/dto';
import { RankingDTO, RankingDTOProps } from '@/modules/ranking/dto';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface HomeContentsDTOProps {
  id: string;
  contentsCategories: ContentCategoryDTOProps[];
  exhibitions: ExhibitionDTOProps[];
  rankings: RankingDTOProps[];
}

export class HomeContentsDTO {
  @Property({ apiProperty: { type: 'string', description: '홈 컨텐츠 id' } })
  id: string;

  @Property({
    apiProperty: { type: 'string', description: '홈 컨텐츠 종류', example: 'CONTENTS | EXHIBITION | RANKING' },
  })
  type: string;

  @Property({ apiProperty: { type: ContentCategoryDTO, isArray: true, description: '컨텐츠' } })
  contentCategories: ContentCategoryDTO[];

  @Property({ apiProperty: { type: ExhibitionDTO, isArray: true, description: '기획전' } })
  exhibitions: ExhibitionDTO[];

  @Property({ apiProperty: { type: RankingDTO, isArray: true, description: '랭킹' } })
  rankings: RankingDTO[];

  constructor(props: HomeContentsDTOProps) {
    this.id = props.id;
    this.type = this.getContentType(props);
    this.contentCategories = props.contentsCategories.map((content) => new ContentCategoryDTO(content));
    this.exhibitions = props.exhibitions.map((exhibition) => new ExhibitionDTO(exhibition));
    this.rankings = props.rankings.map((ranking) => new RankingDTO(ranking));
  }

  getContentType(props: HomeContentsDTOProps) {
    if (props.contentsCategories.length > 0) {
      return 'CONTENTS';
    } else if (props.exhibitions.length > 0) {
      return 'EXHIBITION';
    } else 'RANKING';
  }
}
