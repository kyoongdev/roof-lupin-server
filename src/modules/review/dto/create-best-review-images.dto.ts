import { Property } from 'cumuco-nestjs';

export interface CreateBestReviewImagesDTOProps {
  ids: string[];
}

export class CreateBestReviewImagesDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '리뷰 이미지 id들' } })
  ids: string[];

  constructor(props?: CreateBestReviewImagesDTOProps) {
    if (props) {
      this.ids = props.ids;
    }
  }
}
