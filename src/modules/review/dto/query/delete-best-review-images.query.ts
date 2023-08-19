import { Property } from 'cumuco-nestjs';

export interface DeleteBestReviewImagesQueryProps {
  ids: string;
}

export class DeleteBestReviewImagesQuery {
  @Property({ apiProperty: { type: 'string', description: '리뷰 이미지 id들' } })
  ids: string;

  constructor(props?: DeleteBestReviewImagesQueryProps) {
    if (props) {
      this.ids = props.ids;
    }
  }
}
