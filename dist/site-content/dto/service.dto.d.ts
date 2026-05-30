export declare class CreateServiceDto {
    title: string;
    description: string;
    imageUrl?: string;
}
declare const UpdateServiceDto_base: import("@nestjs/common").Type<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
}
export {};
