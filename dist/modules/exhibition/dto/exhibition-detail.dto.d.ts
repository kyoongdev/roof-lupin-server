import { CouponDTO, type CouponDTOProps } from '@/modules/coupon/dto';
import { ImageDTO, type ImageDTOProps } from '@/modules/file/dto';
import { SpaceDTO, type SpaceDTOProps } from '@/modules/space/dto';
import { ExhibitionDTO, type ExhibitionDTOProps } from './exhibition.dto';
export interface ExhibitionDetailDTOProps extends ExhibitionDTOProps {
    spaces: SpaceDTOProps[];
    coupons: CouponDTOProps[];
    images: ImageDTOProps[];
}
export declare class ExhibitionDetailDTO extends ExhibitionDTO {
    spaces: SpaceDTO[];
    coupons: CouponDTO[];
    images: ImageDTO[];
    constructor(props: ExhibitionDetailDTOProps);
}
