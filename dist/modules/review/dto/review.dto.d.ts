import { Image, Prisma, SpaceReview } from '@prisma/client';
import { ImageDTO } from '@/modules/file/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';
import { FindReviewsQuery } from './query';
import { ReviewAnswerDTO, ReviewAnswerDTOProps } from './review-answer.dto';
export interface ReviewDTOProps extends Partial<SpaceReview> {
    user: CommonUserProps;
    images: {
        image: Image;
    }[];
    answers: ReviewAnswerDTOProps[];
}
export declare class ReviewDTO {
    id: string;
    content: string;
    score: number;
    images: ImageDTO[];
    isBest: boolean;
    user: CommonUserDTO;
    createdAt: Date;
    updatedAt: Date;
    reservationId: string;
    reviewAnswers: ReviewAnswerDTO[];
    constructor(props: ReviewDTOProps);
    static generateQuery(query: FindReviewsQuery, spaceId?: string): Promise<Prisma.SpaceReviewFindManyArgs>;
}
