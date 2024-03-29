import { Property } from 'cumuco-nestjs';

import { UpdateExhibitionSpaceDTO, UpdateExhibitionSpaceDTOProps } from './update-exhibition-space.dto';

export interface UpdateExhibitionDTOProps {
  title?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  spaceTitle?: string;
  startAt?: Date;
  endAt?: Date;
  isShow?: boolean;
  images?: string[];
  spaces?: UpdateExhibitionSpaceDTOProps[];
  couponIds?: string[];
}

export class UpdateExhibitionDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 썸네일' } })
  thumbnail?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 부가 설명' } })
  description?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 내용' } })
  content?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 공간 제목' } })
  spaceTitle?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 시작날짜' } })
  startAt?: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 종료날짜' } })
  endAt?: Date;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '기획전 노출 여부' } })
  isShow?: boolean;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '기획전 이미지 url들' } })
  images?: string[];

  @Property({
    apiProperty: {
      type: UpdateExhibitionSpaceDTO,
      isArray: true,
      nullable: true,
      description: '기획전 연관 공간들',
    },
  })
  spaces?: UpdateExhibitionSpaceDTO[];

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '기획전 쿠폰 id들' } })
  couponIds?: string[];

  constructor(props?: UpdateExhibitionDTOProps) {
    if (props) {
      this.title = props.title;
      this.thumbnail = props.thumbnail;
      this.description = props.description;
      this.content = props.content;
      this.startAt = props.startAt;
      this.isShow = props.isShow;
      this.endAt = props.endAt;
      this.images = props.images;
      this.spaces = props.spaces.map((space) => new UpdateExhibitionSpaceDTO(space));
      this.couponIds = props.couponIds;
    }
  }
}
