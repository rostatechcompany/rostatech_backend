export declare class SocialLinkDto {
    name: string;
    url: string;
}
export declare class TextSectionDto {
    key: string;
    title: string;
    content: string;
    image?: string;
}
export declare class UpdateSettingsDto {
    address?: string;
    shortDescription?: string;
    phoneNumbers?: string[];
    socialLinks?: SocialLinkDto[];
    projectsCount?: number;
    satisfactionRate?: number;
    partnerCompaniesCount?: number;
    textSections?: TextSectionDto[];
}
