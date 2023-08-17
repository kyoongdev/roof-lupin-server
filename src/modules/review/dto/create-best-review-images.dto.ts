import { Property } from 'cumuco-nestjs';

export interface CreateBestReviewImagesDTOProps {
  imageIds: string[];
}

export class CreateBestReviewImagesDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '이미지 id들' } })
  imageIds: string[];

  constructor(props?: CreateBestReviewImagesDTOProps) {
    if (props) {
      this.imageIds = props.imageIds;
    }
  }
}
