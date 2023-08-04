export interface ImageDTOProps {
    id: string;
    url: string;
}
export declare class ImageDTO {
    id: string;
    url: string;
    constructor(props: ImageDTOProps);
    static parseS3ImageKey(url: string): string;
    static parseS3ImageURL(key: string): string;
}
