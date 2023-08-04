import { ContentCategoryDTO, ContentCategoryDTOProps } from '@/modules/category/dto';
import { ExhibitionDTO, ExhibitionDTOProps } from '@/modules/exhibition/dto';
import { RankingDTO, RankingDTOProps } from '@/modules/ranking/dto';
export interface HomeContentsDTOProps {
    id: string;
    contentsCategory: ContentCategoryDTOProps;
    exhibition: ExhibitionDTOProps;
    ranking: RankingDTOProps;
}
export declare class HomeContentsDTO {
    id: string;
    type: string;
    contentCategory?: ContentCategoryDTO;
    exhibition?: ExhibitionDTO;
    ranking?: RankingDTO;
    constructor(props: HomeContentsDTOProps);
    getContentType(props: HomeContentsDTOProps): "CONTENTS" | "EXHIBITION" | "RANKING";
}
