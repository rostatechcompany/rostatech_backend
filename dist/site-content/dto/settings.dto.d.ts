export declare class SocialLinkDto {
    name: string;
    url: string;
}
export declare class UpdateSettingsDto {
    address?: string;
    shortDescription?: string;
    phoneNumbers?: string[];
    socialLinks?: SocialLinkDto[];
    projectsCount?: number;
    satisfactionRate?: number;
    partnerCompaniesCount?: number;
}
