import { DateDTO, type DateProps } from '@/common';
interface AnnouncementDTOProps extends DateProps {
    id: string;
    title: string;
    content: string;
}
export declare class AnnouncementDTO extends DateDTO {
    id: string;
    title: string;
    content: string;
    constructor(props: AnnouncementDTOProps);
}
export {};
