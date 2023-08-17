import { Property } from 'cumuco-nestjs';

export interface DeleteBestReviewImagesQueryProps {
  imageIds: string;
}

export class DeleteBestReviewImagesQuery {
  @Property({ apiProperty: { type: 'string', description: '이미지 id들' } })
  imageIds: string;

  constructor(props?: DeleteBestReviewImagesQueryProps) {
    if (props) {
      this.imageIds = props.imageIds;
    }
  }
}
