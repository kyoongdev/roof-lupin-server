import { Property } from 'wemacu-nestjs';

import { CouponDTO, type CouponDTOProps } from '@/modules/coupon/dto';
import { ImageDTO, type ImageDTOProps } from '@/modules/file/dto';
import { SpaceDTO, type SpaceDTOProps } from '@/modules/space/dto';

import { ExhibitionDTO, type ExhibitionDTOProps } from './exhibition.dto';

export interface ExhibitionDetailDTOProps extends ExhibitionDTOProps {
  spaces: SpaceDTOProps[];
  coupons: CouponDTOProps[];
  images: ImageDTOProps[];
}

export class ExhibitionDetailDTO extends ExhibitionDTO {
  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '연관 공간들' } })
  spaces: SpaceDTO[];

  @Property({ apiProperty: { type: CouponDTO, isArray: true, description: '연관 쿠폰들' } })
  coupons: CouponDTO[];

  @Property({ apiProperty: { type: ImageDTO, isArray: true, description: '이미지' } })
  images: ImageDTO[];

  constructor(props: ExhibitionDetailDTOProps) {
    super(props);
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
    this.coupons = props.coupons.map((coupon) => new CouponDTO(coupon));
    this.images = props.images.map((image) => new ImageDTO(image));
  }
}
