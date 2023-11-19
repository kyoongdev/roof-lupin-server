import { Property } from 'cumuco-nestjs';

import { CreateExhibitionSpaceDTO, CreateExhibitionSpaceDTOProps } from './create-exhibition-space.dto';

export interface CreateExhibitionDTOProps {
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  startAt: Date;
  endAt: Date;
  spaceTitle?: string;
  isShow?: boolean;
  images: string[];
  spaces: CreateExhibitionSpaceDTOProps[];
  couponIds: string[];
}

export class CreateExhibitionDTO {
  @Property({ apiProperty: { type: 'string', description: '기획전 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 부가 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '기획전 공간 제목' } })
  spaceTitle?: string;

  @Property({ apiProperty: { type: 'string', description: '기획전 시작날짜' } })
  startAt: Date;

  @Property({ apiProperty: { type: 'string', description: '기획전 종료날짜' } })
  endAt: Date;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '기획전 노출 여부' } })
  isShow?: boolean;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '기획전 이미지 url들' } })
  images: string[];

  @Property({ apiProperty: { type: CreateExhibitionSpaceDTO, isArray: true, description: '기획전 연관 공간 id들' } })
  spaces: CreateExhibitionSpaceDTO[];

  @Property({ apiProperty: { type: 'string', isArray: true, description: '기획전 쿠폰 id들' } })
  couponIds: string[];

  constructor(props?: CreateExhibitionDTOProps) {
    if (props) {
      this.title = props.title;
      this.thumbnail = props.thumbnail;
      this.description = props.description;
      this.content = props.content;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.isShow = props.isShow;
      this.spaceTitle = props.spaceTitle;
      this.images = props.images;
      this.spaces = props.spaces.map((space) => new CreateExhibitionSpaceDTO(space));
      this.couponIds = props.couponIds;
    }
  }
}
