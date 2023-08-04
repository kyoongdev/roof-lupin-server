interface Props {
    content: string;
    images: string[];
    score: number;
    spaceId: string;
    reservationId: string;
}
export declare class CreateReviewDTO {
    content: string;
    images: string[];
    score: number;
    spaceId: string;
    reservationId: string;
    constructor(props?: Props);
}
export {};
