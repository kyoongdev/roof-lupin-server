import { MainImage } from '@prisma/client';
export type MainImageDTOProps = MainImage;
export declare class MainImageDTO {
    id: string;
    url: string;
    isDefault: boolean;
    constructor(props: MainImageDTOProps);
}
