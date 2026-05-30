export declare class CreateClientDto {
    logoUrl: string;
    companyName: string;
    collaborationDate?: string;
    websiteUrl?: string;
}
declare const UpdateClientDto_base: import("@nestjs/common").Type<Partial<CreateClientDto>>;
export declare class UpdateClientDto extends UpdateClientDto_base {
}
export {};
